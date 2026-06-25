import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";

export function reviewsShort() {
    let swiperInstance = null;
    let observer = null;
    let isVisible = false;

    function initSwiper() {
        // Проверяем, есть ли активный таб в секции reviews-all
        const activePanel = document.querySelector(".reviews-all .tabs__panel.active");

        let sliderEl;
        if (activePanel) {
            // Если есть табы - ищем слайдер в активном табе
            sliderEl = activePanel.querySelector(".reviews-slider");
        } else {
            // Если нет табов - ищем обычный слайдер
            sliderEl = document.querySelector(".reviews-short:not(.reviews-all) .reviews-slider");
        }

        if (!sliderEl) {
            destroySwiper();
            return;
        }

        // Если слайдер уже существует и это тот же элемент, обновляем
        if (swiperInstance && swiperInstance.el === sliderEl) {
            try {
                swiperInstance.update();
                updateNavigationVisibility(sliderEl);
                return;
            } catch (e) {
                destroySwiper();
            }
        }

        // Уничтожаем старый инстанс
        destroySwiper();

        const sliderWrapper = sliderEl.closest(".reviews-short__slider");
        if (!sliderWrapper) return;

        // Скрываем до инициализации
        sliderWrapper.style.opacity = "0";
        sliderWrapper.style.transition = "opacity 0.2s ease";

        const prevBtn = sliderWrapper.querySelector(".reviews-slider__button-prev");
        const nextBtn = sliderWrapper.querySelector(".reviews-slider__button-next");

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
                    sliderWrapper.style.opacity = "1";
                    updateNavigationVisibility(sliderEl);
                },
                slideChange: function() {
                    updateNavigationVisibility(sliderEl);
                },
                resize: function() {
                    updateNavigationVisibility(sliderEl);
                }
            }
        });

        // Запасной таймаут
        setTimeout(() => {
            if (sliderWrapper.style.opacity !== "1") {
                sliderWrapper.style.opacity = "1";
            }
        }, 300);

        // Навигация
        if (prevBtn && nextBtn) {
            const oldPrev = prevBtn.cloneNode(true);
            const oldNext = nextBtn.cloneNode(true);
            prevBtn.parentNode.replaceChild(oldPrev, prevBtn);
            nextBtn.parentNode.replaceChild(oldNext, nextBtn);

            const newPrev = sliderWrapper.querySelector(".reviews-slider__button-prev");
            const newNext = sliderWrapper.querySelector(".reviews-slider__button-next");

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

                updateNavigationVisibility(sliderEl);
            };

            swiperInstance.on("init", updateButtons);
            swiperInstance.on("slideChange", updateButtons);
            updateButtons();
        }
    }

    function updateNavigationVisibility(sliderEl) {
        if (!sliderEl || !swiperInstance) return;

        const sliderWrapper = sliderEl.closest(".reviews-short__slider");
        if (!sliderWrapper) return;

        const navWrapper = sliderWrapper.querySelector(".reviews-slider__nav");
        if (!navWrapper) return;

        const slidesCount = swiperInstance.slides.length;
        const slidesPerView = swiperInstance.params.slidesPerView;

        if (slidesCount <= slidesPerView) {
            navWrapper.style.display = "none";
        } else {
            navWrapper.style.display = "flex";
        }
    }

    function destroySwiper() {
        if (swiperInstance) {
            try {
                swiperInstance.destroy(true, true);
            } catch (e) {}
            swiperInstance = null;
        }
    }

    function setupIntersectionObserver() {
        const section = document.querySelector(".reviews-short");
        if (!section) return;

        if (observer) {
            observer.disconnect();
        }

        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isVisible = entry.isIntersecting;

                if (entry.isIntersecting) {
                    setTimeout(() => {
                        initSwiper();
                    }, 100);
                } else {
                    destroySwiper();
                }
            });
        }, {
            rootMargin: "0px 0px 0px 0px",
            threshold: [0, 0.1, 0.5, 1]
        });

        observer.observe(section);
    }

    // Инициализация
    setTimeout(() => {
        initSwiper();
        setupIntersectionObserver();
    }, 100);

    // Следим за кликами по табам (только для reviews-all)
    document.addEventListener("click", (e) => {
        const tabBtn = e.target.closest("[data-tab-btn]");
        if (tabBtn && document.querySelector(".reviews-all")) {
            document.querySelectorAll(".reviews-short__slider").forEach(el => {
                el.style.opacity = "0";
            });

            destroySwiper();

            setTimeout(() => {
                initSwiper();
            }, 150);
        }
    });

    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (isVisible) {
                initSwiper();
            }
        }, 200);
    });

    document.addEventListener("visibilitychange", () => {
        if (!document.hidden && isVisible) {
            setTimeout(initSwiper, 200);
        }
    });

    window.addEventListener("beforeunload", () => {
        destroySwiper();
        if (observer) {
            observer.disconnect();
        }
    });
}