import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";

export function storiesShort() {
    let swiperInstance = null;
    let observer = null;

    function initSwiper() {
        // Проверяем, есть ли активный таб в секции stories-short-tabs
        const activePanel = document.querySelector(".stories-short-tabs .tabs__panel.active");

        let sliderEl;
        if (activePanel) {
            // Если есть табы - ищем слайдер в активном табе
            sliderEl = activePanel.querySelector(".stories-slider");
        } else {
            // Если нет табов - ищем обычный слайдер
            sliderEl = document.querySelector(".stories-short:not(.stories-short-tabs) .stories-slider");
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
                return;
            } catch (e) {
                swiperInstance = null;
            }
        }

        const sliderWrapper = sliderEl.closest(".stories-short__slider");
        if (sliderWrapper) {
            sliderWrapper.style.opacity = "0";
            sliderWrapper.style.transition = "opacity 0.2s ease";
        }

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
                    initVideoPlayers();
                },
                slideChange: function() {
                    updateNavigationVisibility(sliderEl);
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

        bindNavigation(sliderEl);
        initVideoPlayers();
    }

    function updateNavigationVisibility(sliderEl) {
        if (!sliderEl || !swiperInstance) return;

        const sliderWrapper = sliderEl.closest(".stories-short__slider");
        if (!sliderWrapper) return;

        const navWrapper = sliderWrapper.querySelector(".stories-slider__nav");
        if (!navWrapper) return;

        const slidesCount = swiperInstance.slides.length;
        const slidesPerView = swiperInstance.params.slidesPerView;

        if (slidesCount <= slidesPerView) {
            navWrapper.style.display = "none";
        } else {
            navWrapper.style.display = "flex";
        }
    }

    function bindNavigation(sliderEl) {
        if (!sliderEl || !swiperInstance) return;

        const prevBtn = sliderEl.closest(".stories-short__slider").querySelector(".stories-slider__button-prev");
        const nextBtn = sliderEl.closest(".stories-short__slider").querySelector(".stories-slider__button-next");

        if (!prevBtn || !nextBtn) return;

        const newPrev = prevBtn.cloneNode(true);
        const newNext = nextBtn.cloneNode(true);
        prevBtn.parentNode.replaceChild(newPrev, prevBtn);
        nextBtn.parentNode.replaceChild(newNext, nextBtn);

        const finalPrev = sliderEl.closest(".stories-short__slider").querySelector(".stories-slider__button-prev");
        const finalNext = sliderEl.closest(".stories-short__slider").querySelector(".stories-slider__button-next");

        finalPrev.addEventListener("click", () => swiperInstance.slidePrev());
        finalNext.addEventListener("click", () => swiperInstance.slideNext());

        const updateButtons = () => {
            if (swiperInstance.isBeginning) {
                finalPrev.classList.add("swiper-button-disabled");
            } else {
                finalPrev.classList.remove("swiper-button-disabled");
            }

            if (swiperInstance.isEnd) {
                finalNext.classList.add("swiper-button-disabled");
            } else {
                finalNext.classList.remove("swiper-button-disabled");
            }

            updateNavigationVisibility(sliderEl);
        };

        swiperInstance.on("init", updateButtons);
        swiperInstance.on("slideChange", updateButtons);
        updateButtons();
    }

    function initVideoPlayers() {
        const container = document.querySelector(".stories-short-tabs .tabs__panel.active") || document.querySelector(".stories-short");
        if (!container) return;

        const previewContainers = container.querySelectorAll(".video-review-card__preview-container");

        previewContainers.forEach((container) => {
            if (container.dataset.videoInitialized === "true") return;
            container.dataset.videoInitialized = "true";

            const playButton = container.querySelector(".video-review-card__play");
            const videoUrl = container.dataset.videoUrl;

            if (!playButton || !videoUrl) return;

            const replaceWithIframe = (e) => {
                if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }

                if (container.querySelector(".video-review-card__iframe")) return;

                const iframe = document.createElement("iframe");
                iframe.src = videoUrl;
                iframe.className = "video-review-card__iframe";
                iframe.setAttribute("frameborder", "0");
                iframe.setAttribute(
                    "allow",
                    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                );
                iframe.setAttribute("allowfullscreen", "");

                container.innerHTML = "";
                container.appendChild(iframe);
                container.classList.add("is-playing");
            };

            playButton.addEventListener("click", replaceWithIframe);
            container.addEventListener("click", replaceWithIframe);
        });
    }

    function setupIntersectionObserver() {
        const section = document.querySelector(".stories-short");
        if (!section) return;

        if (observer) {
            observer.disconnect();
        }

        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        if (swiperInstance) {
                            try {
                                swiperInstance.update();
                                const sliderEl = document.querySelector(".stories-short-tabs .tabs__panel.active .stories-slider") ||
                                    document.querySelector(".stories-short:not(.stories-short-tabs) .stories-slider");
                                if (sliderEl) updateNavigationVisibility(sliderEl);
                            } catch (e) {
                                initSwiper();
                            }
                        } else {
                            initSwiper();
                        }
                    }, 50);
                }
            });
        }, {
            rootMargin: "0px 0px 0px 0px",
            threshold: 0.1
        });

        observer.observe(section);
    }

    // Инициализация
    setTimeout(() => {
        initSwiper();
        setupIntersectionObserver();
    }, 100);

    // Следим за кликами по табам (только для stories-short-tabs)
    document.addEventListener("click", (e) => {
        const tabBtn = e.target.closest("[data-tab-btn]");
        if (tabBtn && document.querySelector(".stories-short-tabs")) {
            document.querySelectorAll(".stories-short__slider").forEach(el => {
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
            if (swiperInstance) {
                try {
                    swiperInstance.update();
                    const sliderEl = document.querySelector(".stories-short-tabs .tabs__panel.active .stories-slider") ||
                        document.querySelector(".stories-short:not(.stories-short-tabs) .stories-slider");
                    if (sliderEl) updateNavigationVisibility(sliderEl);
                } catch (e) {
                    initSwiper();
                }
            } else {
                initSwiper();
            }
        }, 200);
    });

    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) {
            setTimeout(() => {
                if (swiperInstance) {
                    try {
                        swiperInstance.update();
                        const sliderEl = document.querySelector(".stories-short-tabs .tabs__panel.active .stories-slider") ||
                            document.querySelector(".stories-short:not(.stories-short-tabs) .stories-slider");
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