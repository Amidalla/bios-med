import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

export function storiesShort() {
    const sliderEl = document.querySelector('.stories-slider');
    if (!sliderEl) return;

    let swiperInstance = null;

    function initSwiper() {
        if (swiperInstance) {
            swiperInstance.destroy(true, true);
            swiperInstance = null;
        }

        swiperInstance = new Swiper(sliderEl, {
            slidesPerView: 1,
            spaceBetween: 20,
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                },
            },
            navigation: {
                nextEl: '.stories-slider__button-next',
                prevEl: '.stories-slider__button-prev',
            },
        });
    }

    initSwiper();
    window.addEventListener('resize', () => initSwiper());

    function initVideoPlayers() {
        const previewContainers = document.querySelectorAll('.video-review-card__preview-container');

        previewContainers.forEach(container => {
            if (container.dataset.videoInitialized === 'true') return;
            container.dataset.videoInitialized = 'true';

            const playButton = container.querySelector('.video-review-card__play');
            const videoUrl = container.dataset.videoUrl;

            if (!playButton || !videoUrl) return;

            const replaceWithIframe = (e) => {
                if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }


                if (container.querySelector('.video-review-card__iframe')) return;

                const iframe = document.createElement('iframe');
                iframe.src = videoUrl;
                iframe.className = 'video-review-card__iframe';
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
                iframe.setAttribute('allowfullscreen', '');

                container.innerHTML = '';
                container.appendChild(iframe);
                container.classList.add('is-playing');
            };

            playButton.addEventListener('click', replaceWithIframe);
            container.addEventListener('click', replaceWithIframe);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initVideoPlayers);
    } else {
        initVideoPlayers();
    }

    if (swiperInstance) {
        swiperInstance.on('init', initVideoPlayers);
        swiperInstance.on('slideChange', initVideoPlayers);
    }
}