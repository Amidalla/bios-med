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
            slidesPerView: 1.3,
            spaceBetween: 18,
            breakpoints: {
                479: {
                    slidesPerView: 1.5,
                    spaceBetween: 16,
                },
                759: {
                    slidesPerView: 2,
                    spaceBetween: 18,
                },
                1310: {
                    slidesPerView: 3,
                    spaceBetween: 22,
                },
            },
        });


        bindNavigation();
    }

    function bindNavigation() {
        const prevBtn = document.querySelector('.stories-slider__button-prev');
        const nextBtn = document.querySelector('.stories-slider__button-next');

        if (!prevBtn || !nextBtn || !swiperInstance) return;

        // Клонируем, чтобы убрать старые обработчики
        const newPrev = prevBtn.cloneNode(true);
        const newNext = nextBtn.cloneNode(true);
        prevBtn.parentNode.replaceChild(newPrev, prevBtn);
        nextBtn.parentNode.replaceChild(newNext, nextBtn);

        const finalPrev = document.querySelector('.stories-slider__button-prev');
        const finalNext = document.querySelector('.stories-slider__button-next');

        finalPrev.addEventListener('click', () => swiperInstance.slidePrev());
        finalNext.addEventListener('click', () => swiperInstance.slideNext());

        const updateButtons = () => {
            if (swiperInstance.isBeginning) {
                finalPrev.classList.add('swiper-button-disabled');
            } else {
                finalPrev.classList.remove('swiper-button-disabled');
            }

            if (swiperInstance.isEnd) {
                finalNext.classList.add('swiper-button-disabled');
            } else {
                finalNext.classList.remove('swiper-button-disabled');
            }
        };

        swiperInstance.on('init', updateButtons);
        swiperInstance.on('slideChange', updateButtons);
        updateButtons();
    }

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


    initSwiper();
    initVideoPlayers();


    window.addEventListener('resize', () => {
        initSwiper();
    });
}