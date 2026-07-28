import { access, copyFile, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const prototypeRoot = path.resolve(scriptDirectory, "..");
const repositoryRoot = path.resolve(prototypeRoot, "..", "..");
const clientDirectory = path.join(prototypeRoot, "dist", "client");
const manifestPath = path.join(repositoryRoot, ".pages-build-manifest.json");

async function listFiles(directory, prefix = "") {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const relativePath = path.join(prefix, entry.name);
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listFiles(absolutePath, relativePath));
    } else {
      files.push(relativePath);
    }
  }
  return files.sort();
}

async function readPreviousManifest() {
  try {
    return JSON.parse(await readFile(manifestPath, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return { files: [] };
    throw error;
  }
}

function isManagedAsset(relativePath) {
  return relativePath.startsWith("assets/")
    && !relativePath.includes("..")
    && !path.isAbsolute(relativePath);
}

await access(path.join(clientDirectory, "index.html"));
await access(path.join(repositoryRoot, "CNAME"));

const builtFiles = await listFiles(clientDirectory);
const builtFileSet = new Set(builtFiles);
const previousManifest = await readPreviousManifest();

for (const relativePath of previousManifest.files ?? []) {
  if (isManagedAsset(relativePath) && !builtFileSet.has(relativePath)) {
    await rm(path.join(repositoryRoot, relativePath), { force: true });
  }
}

const rootAssetsDirectory = path.join(repositoryRoot, "assets");
for (const entry of await readdir(rootAssetsDirectory, { withFileTypes: true })) {
  if (
    entry.isFile()
    && /^(?:index-.*\.(?:js|css)|inter-.*\.woff2?)$/.test(entry.name)
    && !builtFileSet.has(path.join("assets", entry.name))
  ) {
    await rm(path.join(rootAssetsDirectory, entry.name), { force: true });
  }
}

for (const relativePath of builtFiles) {
  const sourcePath = path.join(clientDirectory, relativePath);
  const destinationPath = path.join(repositoryRoot, relativePath);
  await mkdir(path.dirname(destinationPath), { recursive: true });
  await copyFile(sourcePath, destinationPath);
}

await writeFile(path.join(repositoryRoot, ".nojekyll"), "", "utf8");
await writeFile(
  manifestPath,
  `${JSON.stringify({ files: builtFiles }, null, 2)}\n`,
  "utf8"
);

process.stdout.write(
  `Prepared GitHub Pages root with ${builtFiles.length} production files.\n`
);
