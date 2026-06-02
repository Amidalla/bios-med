import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

export function articleShort() {
    const sliderEl = document.querySelector('.article-slider');
    if (!sliderEl) return;

    let swiperInstance = null;
    const isMobile = () => window.innerWidth < 1310;

    function initSwiper() {
        if (swiperInstance) {
            swiperInstance.destroy(true, true);
            swiperInstance = null;
        }

        if (isMobile()) {
            swiperInstance = new Swiper(sliderEl, {
                slidesPerView: 1.2,
                spaceBetween: 15,
                breakpoints: {
                    450: {
                        slidesPerView: 1.5,
                        spaceBetween: 17,
                    },
                    550: {
                        slidesPerView: 1.8,
                        spaceBetween: 17,
                    },
                    640: {
                        slidesPerView: 1.8,
                        spaceBetween: 14,
                    },
                    940: {
                        slidesPerView: 2.5,
                        spaceBetween: 22,
                    }
                },
            });

            // Ручное управление стрелками
            const prevBtn = document.querySelector('.article-slider__button-prev');
            const nextBtn = document.querySelector('.article-slider__button-next');

            if (prevBtn && nextBtn) {
                // Убираем старые обработчики
                const newPrev = prevBtn.cloneNode(true);
                const newNext = nextBtn.cloneNode(true);
                prevBtn.parentNode?.replaceChild(newPrev, prevBtn);
                nextBtn.parentNode?.replaceChild(newNext, nextBtn);

                const finalPrev = document.querySelector('.article-slider__button-prev');
                const finalNext = document.querySelector('.article-slider__button-next');

                finalPrev.addEventListener('click', () => swiperInstance?.slidePrev());
                finalNext.addEventListener('click', () => swiperInstance?.slideNext());

                // Обновляем состояние кнопок
                const updateButtons = () => {
                    if (swiperInstance?.isBeginning) {
                        finalPrev.classList.add('swiper-button-disabled');
                    } else {
                        finalPrev.classList.remove('swiper-button-disabled');
                    }
                    if (swiperInstance?.isEnd) {
                        finalNext.classList.add('swiper-button-disabled');
                    } else {
                        finalNext.classList.remove('swiper-button-disabled');
                    }
                };

                swiperInstance.on('init', updateButtons);
                swiperInstance.on('slideChange', updateButtons);
                updateButtons();
            }
        }
    }

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            initSwiper();
        }, 250);
    });

    initSwiper();
}