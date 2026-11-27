#!/usr/bin/env bash
set -euo pipefail

# Backup iSquad refresh script for an external server (or Mac).
# Runs ONLY when the latest GitHub Actions run of `refresh-isquad.yml` failed
# (e.g. due to Azure/GitHub IP timeouts against resultadosbalonmano.isquad.es).
#
# Usage:
#   ./prototypes/calendari-resultats/scripts/backup-refresh-on-ci-failure.sh
#   ./prototypes/calendari-resultats/scripts/backup-refresh-on-ci-failure.sh --dry-run
#   ./prototypes/calendari-resultats/scripts/backup-refresh-on-ci-failure.sh --force

DRY_RUN=0
FORCE=0
for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=1 ;;
    --force) FORCE=1 ;;
    *) echo "Unknown argument: $arg" >&2; exit 2 ;;
  esac
done

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROTOTYPE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO_DIR="$(cd "$PROTOTYPE_DIR/../.." && pwd)"
REPO_SLUG="${GITHUB_REPOSITORY:-blocksbarcelona/handbol-trio-web}"
WORKFLOW_FILE="${WORKFLOW_FILE:-refresh-isquad.yml}"
STATE_FILE="${BACKUP_STATE_FILE:-${HOME}/.chm-isquad-last-handled-run}"
LOCK_DIR="${BACKUP_LOCK_DIR:-/tmp/chm-isquad-backup.lock}"

if ! mkdir "$LOCK_DIR" 2>/dev/null; then
  echo "[backup] Another backup instance is already running ($LOCK_DIR). Exiting."
  exit 0
fi
trap 'rmdir "$LOCK_DIR" 2>/dev/null || true' EXIT

LATEST_INFO="$(node -e '
const [repo, workflow] = process.argv.slice(1);
const url = `https://api.github.com/repos/${repo}/actions/workflows/${workflow}/runs?branch=main&per_page=1`;
const headers = { "user-agent": "ch-montbui-backup-refresh/1.0", accept: "application/vnd.github+json" };
if (process.env.GH_TOKEN) headers.authorization = `Bearer ${process.env.GH_TOKEN}`;
fetch(url, { headers, signal: AbortSignal.timeout(15000) })
  .then(async r => {
    if (!r.ok) throw new Error(`GitHub API HTTP ${r.status}`);
    const data = await r.json();
    const run = data.workflow_runs?.[0];
    if (!run) {
      console.log("NONE\tnone\tnone");
      return;
    }
    console.log(`${run.id}\t${run.status}\t${run.conclusion ?? "null"}`);
  })
  .catch(err => {
    console.error(err.message || err);
    process.exit(1);
  });
' "$REPO_SLUG" "$WORKFLOW_FILE")"

IFS=$'\t' read -r RUN_ID RUN_STATUS RUN_CONCLUSION <<< "$LATEST_INFO"
echo "[backup] Latest GitHub Actions run: id=${RUN_ID} status=${RUN_STATUS} conclusion=${RUN_CONCLUSION}"

if [ "$FORCE" -ne 1 ]; then
  if [ "$RUN_ID" = "NONE" ]; then
    echo "[backup] No workflow runs found. Nothing to do."
    exit 0
  fi

  if [ "$RUN_STATUS" != "completed" ]; then
    echo "[backup] GitHub Actions run ${RUN_ID} is still ${RUN_STATUS}. Skipping."
    exit 0
  fi

  if [ "$RUN_CONCLUSION" = "success" ]; then
    echo "[backup] GitHub Actions succeeded (${RUN_ID}). Backup not needed."
    exit 0
  fi

  if [ -f "$STATE_FILE" ] && [ "$(cat "$STATE_FILE")" = "$RUN_ID" ]; then
    echo "[backup] Failed run ${RUN_ID} was already handled by backup. Skipping."
    exit 0
  fi
fi

echo "[backup] GitHub Actions failed (${RUN_ID}: ${RUN_CONCLUSION}). Running backup refresh from this server..."

cd "$REPO_DIR"

if [ -n "$(git status --porcelain)" ]; then
  echo "[backup] Working tree is not clean in $REPO_DIR. Aborting to avoid overwriting local changes." >&2
  exit 1
fi

git fetch origin main
git pull --ff-only origin main

if [ "$DRY_RUN" -eq 1 ]; then
  echo "[backup] --dry-run: would run refresh-isquad.mjs, build:pages, npm test, commit and push."
  exit 0
fi

cd "$PROTOTYPE_DIR"
if [ ! -d node_modules ]; then
  npm ci
fi

node scripts/refresh-isquad.mjs

cd "$REPO_DIR"
if [ -z "$(git status --porcelain)" ]; then
  echo "[backup] No iSquad changes detected. Recording handled run ${RUN_ID}."
  printf '%s\n' "$RUN_ID" > "$STATE_FILE"
  exit 0
fi

cd "$PROTOTYPE_DIR"
npm run build:pages
npm test

cd "$REPO_DIR"
DATE_UTC="$(date -u +%Y-%m-%d)"
git add -A
git commit -m "chore(calendar): publish backup iSquad refresh ${DATE_UTC} (CI run ${RUN_ID})"
git push origin main

printf '%s\n' "$RUN_ID" > "$STATE_FILE"
echo "[backup] Published backup update and recorded handled run ${RUN_ID}."
