import assert from "node:assert/strict";
import test from "node:test";
import { fetchLatestVideos } from "../src/youtube.mjs";

const config = { apiKey: "test-browser-key", playlistId: "UU-test-channel" };
function item(id, publishedAt, title = "Match video") {
  return {
    snippet: { title, resourceId: { videoId: id }, publishedAt: "2026-10-24T20:00:00Z" },
    contentDetails: { videoPublishedAt: publishedAt },
  };
}

test("new public uploads replace fixed videos, ordered by video publication rather than playlist insertion", async () => {
  const signal = new AbortController().signal;
  const videos = await fetchLatestVideos(config, { signal, fetchImpl: async (url, options) => {
    assert.equal(url.origin, "https://www.googleapis.com");
    assert.equal(url.searchParams.get("playlistId"), config.playlistId);
    assert.equal(url.searchParams.get("key"), config.apiKey);
    assert.equal(options.cache, "no-store");
    assert.equal(options.signal, signal);
    return Response.json({ items: [
      item("fyYuH7XItXU", "2026-05-25T06:47:24Z"),
      { snippet: { title: "Private video" } },
      { snippet: { title: "Private video", resourceId: { videoId: "aaaaaaaaaaa" }, publishedAt: "2026-10-25T00:00:00Z" } },
      item("4qVWhDXcagA", "2026-10-03T14:35:14Z"),
      item("RRm9OUORhbA", "2026-10-24T19:11:15Z", "CHM - Vilanova i la Geltrú"),
      item("RRm9OUORhbA", "2026-10-24T19:11:15Z"),
      item("FNRuSIof8YA", "2026-03-02T10:23:40Z"),
      item("UKiLHjdMxG8", "2026-03-02T06:02:13Z"),
      item("bad-id", "2026-10-25T00:00:00Z"),
      item("Oefcro06JNA", "invalid-date"),
    ] });
  } });
  assert.deepEqual(videos.map(video => video.id), ["RRm9OUORhbA", "4qVWhDXcagA", "fyYuH7XItXU", "FNRuSIof8YA"]);
  assert.equal(videos[0].title, "CHM - Vilanova i la Geltrú");
  assert.equal(videos[0].publishedAt, "2026-10-24T19:11:15Z");
});

test("API failure or an unusable response rejects instead of presenting old fixed videos as current", async () => {
  for (const response of [new Response(null, { status: 403 }), Response.json({ error: {} }), Response.json({ items: [] })]) {
    await assert.rejects(fetchLatestVideos(config, { fetchImpl: async () => response }));
  }
});

test("network cancellation propagates to allow clean unmount and retry", async () => {
  const controller = new AbortController();
  controller.abort();
  await assert.rejects(fetchLatestVideos(config, { signal: controller.signal, fetchImpl: async (_, { signal }) => {
    signal.throwIfAborted();
  } }), { name: "AbortError" });
});
