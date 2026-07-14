import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";

export function reviewsShort() {
    let swiperInstance = null;
    let observer = null;
    let isVisible = false;

    // ===== ФУНКЦИЯ ДЛЯ ВИДЕО (скопирована из storiesShort) =====
    function initVideoPlayers() {
        // Ищем контейнеры с видео в секции reviews-short-sub
        const container = document.querySelector('.reviews-short-sub');
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
        // Проверяем, есть ли активный таб в секции reviews-all
        const activePanel = document.querySelector(".reviews-all .tabs__panel.active");

        let sliderEl;
        if (activePanel) {
            sliderEl = activePanel.querySelector(".reviews-slider");
        } else {
            sliderEl = document.querySelector(".reviews-short:not(.reviews-all) .reviews-slider");
        }

        if (!sliderEl) {
            if (swiperInstance) {
                swiperInstance.destroy(true, true);
                swiperInstance = null;
            }
            return;
        }

        if (swiperInstance && swiperInstance.el === sliderEl) {
            try {
                swiperInstance.update();
                updateNavigationVisibility(sliderEl);
                setTimeout(initVideoPlayers, 200);
                return;
            } catch (e) {
                swiperInstance = null;
            }
        }

        const sliderWrapper = sliderEl.closest(".reviews-short__slider");
        if (sliderWrapper) {
            sliderWrapper.style.opacity = "0";
            sliderWrapper.style.transition = "opacity 0.2s ease";
        }

        if (swiperInstance) {
            swiperInstance.destroy(true, true);
            swiperInstance = null;
        }

        const prevBtn = sliderWrapper ? sliderWrapper.querySelector(".reviews-slider__button-prev") : null;
        const nextBtn = sliderWrapper ? sliderWrapper.querySelector(".reviews-slider__button-next") : null;

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
                    if (sliderWrapper) {
                        sliderWrapper.style.opacity = "1";
                    }
                    updateNavigationVisibility(sliderEl);
                    setTimeout(initVideoPlayers, 200);
                },
                slideChange: function() {
                    updateNavigationVisibility(sliderEl);
                    setTimeout(initVideoPlayers, 200);
                },
                resize: function() {
                    updateNavigationVisibility(sliderEl);
                }
            }
        });

        setTimeout(() => {
            if (sliderWrapper && sliderWrapper.style.opacity !== "1") {
                sliderWrapper.style.opacity = "1";
                initVideoPlayers();
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

        initVideoPlayers();
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
        const sections = document.querySelectorAll(".reviews-short:not(.reviews-all)");
        if (!sections.length) return;

        if (observer) {
            observer.disconnect();
        }

        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isVisible = entry.isIntersecting;
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        if (swiperInstance) {
                            try {
                                swiperInstance.update();
                                const sliderEl = document.querySelector(".reviews-short:not(.reviews-all) .reviews-slider");
                                if (sliderEl) updateNavigationVisibility(sliderEl);
                            } catch (e) {
                                initSwiper();
                            }
                        } else {
                            initSwiper();
                        }
                    }, 50);
                } else {
                    destroySwiper();
                }
            });
        }, {
            rootMargin: "0px 0px 0px 0px",
            threshold: 0.1
        });

        sections.forEach(section => observer.observe(section));
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

            if (swiperInstance) {
                try {
                    swiperInstance.destroy(true, true);
                } catch (e) {}
                swiperInstance = null;
            }

            setTimeout(initSwiper, 150);
        }
    });

    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (isVisible) {
                if (swiperInstance) {
                    try {
                        swiperInstance.update();
                        const sliderEl = document.querySelector(".reviews-short:not(.reviews-all) .reviews-slider");
                        if (sliderEl) updateNavigationVisibility(sliderEl);
                    } catch (e) {
                        initSwiper();
                    }
                } else {
                    initSwiper();
                }
            }
        }, 200);
    });

    document.addEventListener("visibilitychange", () => {
        if (!document.hidden && isVisible) {
            setTimeout(() => {
                if (swiperInstance) {
                    try {
                        swiperInstance.update();
                        const sliderEl = document.querySelector(".reviews-short:not(.reviews-all) .reviews-slider");
                        if (sliderEl) updateNavigationVisibility(sliderEl);
                    } catch (e) {
                        initSwiper();
                    }
                } else {
                    initSwiper();
                }
            }, 200);
        }
    });

    window.addEventListener("beforeunload", () => {
        if (swiperInstance) {
            try {
                swiperInstance.destroy(true, true);
            } catch (e) {}
            swiperInstance = null;
        }
        if (observer) {
            observer.disconnect();
        }
    });
}