document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');

            // Update aria-expanded for accessibility
            const isExpanded = mobileMenu.classList.contains('open');
            mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Lightbox Logic
    const zoomableImages = document.querySelectorAll('.zoomable-image');

    if (zoomableImages.length > 0) {
        // Create Lightbox Elements
        const lightboxOverlay = document.createElement('div');
        lightboxOverlay.className = 'lightbox-overlay';

        const lightboxImage = document.createElement('img');
        lightboxImage.className = 'lightbox-image';

        const lightboxClose = document.createElement('div');
        lightboxClose.className = 'lightbox-close';
        lightboxClose.innerHTML = '&times;';

        lightboxOverlay.appendChild(lightboxImage);
        lightboxOverlay.appendChild(lightboxClose);
        document.body.appendChild(lightboxOverlay);

        // Open Lightbox
        zoomableImages.forEach(img => {
            img.addEventListener('click', (e) => {
                e.preventDefault();
                lightboxImage.src = img.src;
                lightboxImage.alt = img.alt;
                lightboxOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        // Close Lightbox
        const closeLightbox = () => {
            lightboxOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
            setTimeout(() => {
                lightboxImage.src = ''; // Clear src after transition
            }, 300);
        };

        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target !== lightboxImage) {
                closeLightbox();
            }
        });

        lightboxClose.addEventListener('click', closeLightbox);

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightboxOverlay.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // Dynamic Year Logic
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    // Dynamic Season Logic – rolls over on May 1st for recruitment
    const seasonYearsSpan = document.getElementById('season-years');
    if (seasonYearsSpan) {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth(); // 0-11

        let startYear, endYear;

        // From May (4) onwards → show NEXT season (recruitment period)
        // Jan-Apr → show current season
        if (currentMonth >= 4) {
            // May - Dec: Next season
            startYear = currentYear;
            endYear = currentYear + 1;
        } else {
            // Jan - Apr: Current season
            startYear = currentYear - 1;
            endYear = currentYear;
        }

        seasonYearsSpan.textContent = `${startYear}-${endYear}`;
    }

    // Dynamic History Years Logic
    const historyYearsSpan = document.getElementById('history-years');
    if (historyYearsSpan) {
        const currentYear = new Date().getFullYear();
        const historyYears = currentYear - 2006;
        historyYearsSpan.textContent = historyYears;
    }
});
