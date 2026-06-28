// hero-video.js
export function heroVideo(context = document) {
    const videoSection = context.querySelector('[data-video-hero]');
    if (!videoSection) return;
    if (videoSection.dataset.init === "true") return;
    videoSection.dataset.init = "true";

    const poster = videoSection.querySelector('[data-video-poster]');
    const posterImg = poster?.querySelector('img');
    const player = videoSection.querySelector('[data-video-player]');
    const playBtn = videoSection.querySelector('[data-video-play]');
    const iframe = player?.querySelector('iframe');

    if (!poster || !player || !iframe || !playBtn) return;

    const originalSrc = iframe.src;

    // --- Lazy Load для постера ---
    if (posterImg?.dataset.src) {
        const imgSrc = posterImg.dataset.src;
        const img = new Image();
        img.onload = function() {
            posterImg.src = imgSrc;
            posterImg.classList.add('loaded');
        };
        img.onerror = function() {
            if (posterImg.src) {
                posterImg.classList.add('loaded');
            }
        };
        img.src = imgSrc;
    } else if (posterImg) {
        posterImg.classList.add('loaded');
    }

    // --- Открытие видео ---
    const playVideo = (e) => {
        e.preventDefault();
        iframe.src = `${originalSrc}?autoplay=1`;
        poster.style.display = 'none';
        playBtn.style.display = 'none';
        player.style.display = 'block';
        player.classList.add('active');
    };

    // --- Закрытие видео ---
    const closeVideo = (e) => {
        if (e && e.target.closest('iframe')) return;

        player.classList.remove('active');
        setTimeout(() => {
            player.style.display = 'none';
        }, 500);

        poster.style.display = 'block';
        playBtn.style.display = 'flex';
        iframe.src = originalSrc;
    };

    // --- Обработчики ---
    playBtn.addEventListener('click', playVideo);
    poster.addEventListener('click', playVideo);
    player.addEventListener('click', closeVideo);

    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && player.style.display === 'block') {
            closeVideo();
        }
    });
}