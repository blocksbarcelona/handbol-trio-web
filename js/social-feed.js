/**
 * Social Media Feed Integration
 * Handles fetching and rendering of Instagram Reels and YouTube Videos
 */

const CONFIG = {
    YOUTUBE: {
        API_KEY: 'AIzaSyCMol3SylE7t1Vwr8F5yl8MkqaOrz12d5E',
        CHANNEL_ID: 'UC9qOilYPVKffSE6dL7hdh0g',
        UPLOADS_PLAYLIST_ID: 'UU9qOilYPVKffSE6dL7hdh0g',
        MAX_RESULTS: 5
    },
    INSTAGRAM: {
        // Token to be provided later. Using mock data for now.
        ACCESS_TOKEN: '',
        MOCK_DATA: [
            {
                id: '1',
                permalink: 'https://www.instagram.com/chmontbui/',
                media_url: 'assets/images/reel-mock-1.jpg', // We will use a placeholder or color
                thumbnail_url: 'assets/images/reel-mock-1.jpg',
                caption: 'Gran victoria del equipo senior femenino este fin de semana! 💪🤾‍♀️ #HandbolMontbui',
                timestamp: '2023-11-20T12:00:00+0000'
            },
            {
                id: '2',
                permalink: 'https://www.instagram.com/chmontbui/',
                media_url: 'assets/images/reel-mock-2.jpg',
                thumbnail_url: 'assets/images/reel-mock-2.jpg',
                caption: 'Entrenamiento de tecnificación con la base. El futuro es brillante ✨',
                timestamp: '2023-11-18T15:30:00+0000'
            },
            {
                id: '3',
                permalink: 'https://www.instagram.com/chmontbui/',
                media_url: 'assets/images/reel-mock-3.jpg',
                thumbnail_url: 'assets/images/reel-mock-3.jpg',
                caption: 'Resumen de la jornada 5. ¡Seguimos sumando! 📈',
                timestamp: '2023-11-15T09:00:00+0000'
            },
            {
                id: '4',
                permalink: 'https://www.instagram.com/chmontbui/',
                media_url: 'assets/images/reel-mock-4.jpg',
                thumbnail_url: 'assets/images/reel-mock-4.jpg',
                caption: 'Nuestras porteras en acción 🧱⛔',
                timestamp: '2023-11-12T18:45:00+0000'
            },
            {
                id: '5',
                permalink: 'https://www.instagram.com/chmontbui/',
                media_url: 'assets/images/reel-mock-5.jpg',
                thumbnail_url: 'assets/images/reel-mock-5.jpg',
                caption: 'Día de partido! Os esperamos en el pabellón a las 18:00 🕕',
                timestamp: '2023-11-10T10:00:00+0000'
            }
        ]
    }
};

class SocialMediaService {
    constructor() {
        this.reelsContainer = document.getElementById('reels-container');
        this.youtubeContainer = document.getElementById('youtube-container');
    }

    async init() {
        // Run in parallel
        await Promise.all([
            this.loadInstagramReels(),
            this.loadYouTubeVideos()
        ]);
    }

    // --- Instagram Logic ---
    async loadInstagramReels() {
        try {
            let reels = [];

            if (CONFIG.INSTAGRAM.ACCESS_TOKEN) {
                // Real API Call (Future implementation)
                // const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${CONFIG.INSTAGRAM.ACCESS_TOKEN}`);
                // const data = await response.json();
                // reels = data.data.filter(item => item.media_type === 'VIDEO');
            } else {
                // Mock Data
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 800));
                reels = CONFIG.INSTAGRAM.MOCK_DATA;
            }

            this.renderReels(reels);

        } catch (error) {
            console.error('Error loading Instagram Reels:', error);
            this.reelsContainer.innerHTML = '<p class="text-center" style="width:100%; color:var(--muted-foreground)">No se pudieron cargar los Reels.</p>';
        }
    }

    renderReels(reels) {
        this.reelsContainer.innerHTML = ''; // Clear skeletons

        reels.forEach((reel, index) => {
            // Generate a random gradient for the mock placeholder if no image
            const bgStyle = reel.thumbnail_url.includes('mock')
                ? `background: linear-gradient(135deg, hsl(${200 + index * 30}, 70%, 60%), hsl(${300 + index * 30}, 70%, 60%))`
                : `background-image: url('${reel.thumbnail_url}')`;

            const card = document.createElement('div');
            card.className = 'reel-card';
            card.style = bgStyle;
            card.onclick = () => window.open(reel.permalink, '_blank');

            card.innerHTML = `
                <div class="reel-overlay">
                    <p style="font-size: 0.875rem; font-weight: 500; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                        ${reel.caption || ''}
                    </p>
                </div>
                <div class="reel-play-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                </div>
            `;
            this.reelsContainer.appendChild(card);
        });
    }

    // --- YouTube Logic ---
    async loadYouTubeVideos() {
        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${CONFIG.YOUTUBE.UPLOADS_PLAYLIST_ID}&maxResults=${CONFIG.YOUTUBE.MAX_RESULTS}&key=${CONFIG.YOUTUBE.API_KEY}`
            );

            if (!response.ok) throw new Error('YouTube API Error');

            const data = await response.json();
            const videos = data.items;

            if (videos.length > 0) {
                this.renderYouTube(videos);
            } else {
                throw new Error('No videos found');
            }

        } catch (error) {
            console.error('Error loading YouTube videos:', error);
            this.youtubeContainer.innerHTML = '<p class="text-center" style="width:100%; color:var(--muted-foreground)">No se pudieron cargar los vídeos.</p>';
        }
    }

    renderYouTube(videos) {
        this.youtubeContainer.innerHTML = ''; // Clear skeletons

        const mainVideo = videos[0];
        const sideVideos = videos.slice(1);

        // Render Main Video
        const mainEl = document.createElement('div');
        mainEl.className = 'youtube-main';

        // We use an iframe directly for the main video for immediate playability
        // Or we could use a thumbnail + click-to-load for performance. 
        // Let's use iframe for simplicity and "wow" factor as requested.
        mainEl.innerHTML = `
            <iframe 
                src="https://www.youtube.com/embed/${mainVideo.snippet.resourceId.videoId}" 
                title="${mainVideo.snippet.title}"
                class="youtube-iframe" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        `;

        // Render Side List
        const listEl = document.createElement('div');
        listEl.className = 'youtube-list';

        sideVideos.forEach(video => {
            const item = document.createElement('a');
            item.className = 'youtube-list-item';
            item.href = `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`;
            item.target = '_blank';

            item.innerHTML = `
                <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}" class="youtube-thumb-small">
                <div class="youtube-info-small">
                    <h4>${video.snippet.title}</h4>
                    <p class="youtube-meta">${new Date(video.snippet.publishedAt).toLocaleDateString()}</p>
                </div>
            `;
            listEl.appendChild(item);
        });

        this.youtubeContainer.appendChild(mainEl);
        this.youtubeContainer.appendChild(listEl);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const socialService = new SocialMediaService();
    socialService.init();
});
