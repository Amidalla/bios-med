import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";

export function expertAdvice() {
    const sliderEl = document.querySelector(".expert-advice-slider");
    if (!sliderEl) return;

    let swiperInstance = null;

    // ===== ФУНКЦИЯ ДЛЯ ВИДЕО (такая же, как в storiesShort) =====
    function initVideoPlayers() {
        // Ищем контейнеры с видео внутри expert-advice
        const container = document.querySelector('.expert-advice');
        if (!container) return;

        const previewContainers = container.querySelectorAll('.video-review-card__preview-container');

        previewContainers.forEach((container) => {
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
                iframe.src = videoUrl + (videoUrl.includes('?') ? '&' : '?') + 'autoplay=1';
                iframe.className = 'video-review-card__iframe';
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute(
                    'allow',
                    'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                );
                iframe.setAttribute('allowfullscreen', '');

                container.innerHTML = '';
                container.appendChild(iframe);
                container.classList.add('is-playing');
            };

            playButton.addEventListener('click', replaceWithIframe);
            container.addEventListener('click', replaceWithIframe);
        });
    }

    function initSwiper() {
        if (swiperInstance) {
            swiperInstance.destroy(true, true);
            swiperInstance = null;
        }

        const prevBtn = document.querySelector(".expert-advice-slider__button-prev");
        const nextBtn = document.querySelector(".expert-advice-slider__button-next");

        swiperInstance = new Swiper(sliderEl, {
            slidesPerView: 1.3,
            spaceBetween: 17,
            breakpoints: {
                479: {
                    slidesPerView: 1.5,
                    spaceBetween: 16
                },
                759: {
                    slidesPerView: 2,
                    spaceBetween: 18
                },
                1310: {
                    slidesPerView: 3,
                    spaceBetween: 22
                }
            },
            on: {
                init: function() {
                    // ✅ Инициализируем видео после загрузки слайдера
                    setTimeout(initVideoPlayers, 200);
                },
                slideChange: function() {
                    // ✅ Обновляем видео при смене слайда
                    setTimeout(initVideoPlayers, 200);
                }
            }
        });

        // ✅ Также вызываем после инициализации
        setTimeout(initVideoPlayers, 300);

        if (prevBtn && nextBtn) {
            const oldPrev = prevBtn.cloneNode(true);
            const oldNext = nextBtn.cloneNode(true);
            prevBtn.parentNode.replaceChild(oldPrev, prevBtn);
            nextBtn.parentNode.replaceChild(oldNext, nextBtn);

            const newPrev = document.querySelector(".expert-advice-slider__button-prev");
            const newNext = document.querySelector(".expert-advice-slider__button-next");

            newPrev.addEventListener("click", () => swiperInstance.slidePrev());
            newNext.addEventListener("click", () => swiperInstance.slideNext());

            const updateButtons = () => {
                if (swiperInstance.isBeginning) {
                    newPrev.classList.add("swiper-button-disabled");
                } else {
                    newPrev.classList.remove("swiper-button-disabled");
                }

                if (swiperInstance.isEnd) {
                    newNext.classList.add("swiper-button-disabled");
                } else {
                    newNext.classList.remove("swiper-button-disabled");
                }
            };

            swiperInstance.on("init", updateButtons);
            swiperInstance.on("slideChange", updateButtons);
            updateButtons();
        }

        initVideoPlayers();
    }

    initSwiper();
    window.addEventListener("resize", () => initSwiper());
}