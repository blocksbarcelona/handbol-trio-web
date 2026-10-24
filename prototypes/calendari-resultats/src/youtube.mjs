export const YOUTUBE_REFRESH_MS = 5 * 60 * 1000;

export async function fetchLatestVideos(config, { signal, fetchImpl = fetch } = {}) {
  const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
  url.search = new URLSearchParams({
    part: "snippet,contentDetails",
    playlistId: config.playlistId,
    maxResults: "12",
    key: config.apiKey,
  });
  const response = await fetchImpl(url, { signal, cache: "no-store" });
  if (!response.ok) throw new Error("Unable to load YouTube videos");
  const data = await response.json();
  if (!Array.isArray(data.items)) throw new Error("Invalid YouTube response");

  const seen = new Set();
  const videos = data.items.map(({ snippet, contentDetails }) => ({
    id: snippet?.resourceId?.videoId,
    title: snippet?.title?.trim(),
    // Private/deleted entries have no public video publication timestamp.
    publishedAt: contentDetails?.videoPublishedAt,
  })).filter(video => /^[\w-]{11}$/.test(video.id ?? "")
    && video.title && Number.isFinite(Date.parse(video.publishedAt)))
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    .filter(video => {
      if (seen.has(video.id)) return false;
      seen.add(video.id);
      return true;
    }).slice(0, 4);

  if (!videos.length) throw new Error("No public YouTube videos available");
  return videos;
}
