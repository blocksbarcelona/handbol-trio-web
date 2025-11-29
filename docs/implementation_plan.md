# Social Media Integration Plan

## 1. Overview
This document outlines the technical approach to integrating an **Instagram Reels Feed** and a **YouTube Video Feed** into the Club Handbol Montbui website. The goal is to increase user engagement by showcasing dynamic multimedia content directly on the homepage or a dedicated section.

## 2. Graphic Proposal
**Visual Concept:** A "Social Hub" section featuring a modern, dual-layout design.
- **Instagram Reels (Top/Left):** A horizontal scrolling carousel of vertical cards (9:16 ratio). This mimics the native mobile experience.
- **YouTube (Bottom/Right):** A "Featured" layout with one large recent video and a side list of previous videos, or a clean grid of 16:9 thumbnails.

*(See generated graphic proposal image for visual reference)*

## 3. Technical Architecture

### 3.1. Instagram Integration
**API:** Instagram Basic Display API
**Goal:** Fetch the latest media items filtered by `media_type="VIDEO"`.

**Prerequisites:**
1.  **Facebook Developer Account**: Required to create an App.
2.  **Instagram Tester User**: The club's IG account must accept the tester invitation.
3.  **Access Token**: A Long-Lived Access Token (valid for 60 days) is required.

**Implementation Steps:**
1.  **Fetch Media**:
    - Endpoint: `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token={TOKEN}`
    - Filter: Client-side filter for `media_type === 'VIDEO'`.
2.  **Token Refresh Strategy**:
    - Since this is a static site (Vanilla JS), the token must be refreshed manually every ~50 days OR use a simple serverless function (e.g., Netlify/Vercel Functions) to refresh it automatically.
    - *Recommendation for MVP:* Manual update or a simple cron job script.

### 3.2. YouTube Integration
**API:** YouTube Data API v3
**Goal:** Fetch the latest uploaded videos from the specific channel.

**Prerequisites:**
1.  **Google Cloud Project**: To enable YouTube Data API v3.
2.  **API Key**: Restricted to the website's domain (HTTP Referrer restriction) for security.

**Implementation Steps:**
1.  **Get Uploads Playlist ID** (One-time setup or cached):
    - Endpoint: `channels?part=contentDetails&id={CHANNEL_ID}`
    - Extract `contentDetails.relatedPlaylists.uploads`.
2.  **Fetch Videos** (Efficient Method):
    - Endpoint: `playlistItems?part=snippet&playlistId={UPLOADS_PLAYLIST_ID}&maxResults=4`
    - *Note:* This costs only 1 quota unit per call, whereas the `search` endpoint costs 100 units. This is critical for staying within the free tier (10,000 units/day).

### 3.3. Frontend Implementation (Vanilla JS)

**Data Caching (Crucial):**
To prevent hitting API rate limits and improve load speed, we will implement a LocalStorage caching mechanism.
- **Logic:**
    1. Check `localStorage` for `social_feed_data`.
    2. If data exists and is younger than 1 hour, use cached data.
    3. If expired or missing, fetch from APIs, save to `localStorage` with a timestamp, and render.

**UI Components:**
1.  **Reels Carousel:**
    - CSS `scroll-snap-type: x mandatory` for smooth swiping.
    - Cards with `background-image` set to the video thumbnail.
    - Hover effect: Show "Play" icon and caption.
    - Click action: Open Instagram link in new tab.
2.  **YouTube Grid:**
    - CSS Grid layout.
    - Main video: Embed `iframe` or high-res thumbnail that loads `iframe` on click (Facade pattern for performance).
    - List items: Thumbnails + Titles.

## 4. Development Roadmap

### Phase 1: Setup & Credentials
- [ ] Create Facebook Developer App & Generate Instagram Token.
- [ ] Create Google Cloud Project & Generate YouTube API Key.
- [ ] Define environment variables/config file for keys (Note: On a static site, these are visible, so domain restriction is mandatory).

### Phase 2: Core Logic (JavaScript)
- [ ] Create `SocialMediaService` class.
- [ ] Implement `fetchInstagramReels()` with error handling.
- [ ] Implement `fetchYouTubeVideos()` with quota optimization.
- [ ] Implement `CacheManager` for LocalStorage logic.

### Phase 3: UI/UX Construction
- [ ] Add HTML structure to `index.html` (new `<section id="social-hub">`).
- [ ] Add CSS styles for the carousel and grid layouts.
- [ ] Implement responsive behavior (stacking columns on mobile).

### Phase 4: Testing & Optimization
- [ ] Verify API quota usage.
- [ ] Test responsive design on mobile/desktop.
- [ ] Validate "Load More" or link to full social profiles.
