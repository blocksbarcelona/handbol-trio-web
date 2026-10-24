import { useEffect, useState } from "react";
import { fetchLatestVideos, YOUTUBE_REFRESH_MS } from "./youtube.mjs";

export function useYouTubeVideos() {
  const [videos, setVideos] = useState([]);
  const [status, setStatus] = useState("loading");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let disposed = false;
    let controller;
    let lastAttempt = 0;

    async function refresh() {
      if (controller) return;
      lastAttempt = Date.now();
      controller = new AbortController();
      const timeout = window.setTimeout(() => controller?.abort(), 15000);
      try {
        const latest = await fetchLatestVideos(__YOUTUBE_CONFIG__, { signal: controller.signal });
        if (!disposed) {
          setVideos(latest);
          setStatus("ready");
        }
      } catch {
        if (!disposed) setStatus("error");
      } finally {
        window.clearTimeout(timeout);
        controller = undefined;
      }
    }

    function refreshWhenVisible() {
      if (document.visibilityState === "visible" && Date.now() - lastAttempt >= 60000) refresh();
    }

    refresh();
    const interval = window.setInterval(refreshWhenVisible, YOUTUBE_REFRESH_MS);
    document.addEventListener("visibilitychange", refreshWhenVisible);
    return () => {
      disposed = true;
      controller?.abort();
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", refreshWhenVisible);
    };
  }, [retry]);

  return { videos, status, retry: () => {
    setStatus("loading");
    setRetry(value => value + 1);
  } };
}
