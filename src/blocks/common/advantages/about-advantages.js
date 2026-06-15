export function advantagesVideo() {
    const videoSections = document.querySelectorAll('[data-video]');
    if (!videoSections.length) return;

    videoSections.forEach((videoSection) => {
        if (videoSection.dataset.init === "true") return;
        videoSection.dataset.init = "true";

        const poster = videoSection.querySelector('[data-video-poster]');
        const player = videoSection.querySelector('[data-video-player]');
        const playBtn = videoSection.querySelector('[data-video-play]');
        const iframe = player?.querySelector('iframe');

        if (!poster || !player || !iframe) return;

        const originalSrc = iframe.src;

        const playVideo = (e) => {
            e.preventDefault();
            iframe.src = `${originalSrc  }?autoplay=1`;
            poster.style.display = 'none';
            player.style.display = 'block';
        };

        if (playBtn) {
            playBtn.addEventListener('click', playVideo);
        }
        poster.addEventListener('click', playVideo);
    });
}