import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function preparingSurgery() {
    const sliderEl = document.querySelector(".preparing-slider");
    if (!sliderEl) return;

    let swiperInstance = null;
    const isMobile = () => window.innerWidth <= 759;

    function initSwiper() {
        if (swiperInstance) {
            swiperInstance.destroy(true, true);
            swiperInstance = null;
        }

        if (isMobile()) {
            swiperInstance = new Swiper(sliderEl, {
                slidesPerView: 1.2,
                spaceBetween: 16,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1.2,
                        spaceBetween: 16
                    },
                    400: {
                        slidesPerView: 1.7,
                        spaceBetween: 20
                    },
                    580: {
                        slidesPerView: 2.1,
                        spaceBetween: 20
                    },
                    700: {
                        slidesPerView: 2.3,
                        spaceBetween: 20
                    }
                }
            });

            const prevBtn = document.querySelector(".preparing-slider__button-prev");
            const nextBtn = document.querySelector(".preparing-slider__button-next");

            if (prevBtn && nextBtn) {
                const newPrev = prevBtn.cloneNode(true);
                const newNext = nextBtn.cloneNode(true);
                prevBtn.parentNode?.replaceChild(newPrev, prevBtn);
                nextBtn.parentNode?.replaceChild(newNext, nextBtn);

                const finalPrev = document.querySelector(".preparing-slider__button-prev");
                const finalNext = document.querySelector(".preparing-slider__button-next");

                finalPrev.addEventListener("click", () => swiperInstance?.slidePrev());
                finalNext.addEventListener("click", () => swiperInstance?.slideNext());

                const updateButtons = () => {
                    if (swiperInstance?.isBeginning) {
                        finalPrev.classList.add("swiper-button-disabled");
                    } else {
                        finalPrev.classList.remove("swiper-button-disabled");
                    }
                    if (swiperInstance?.isEnd) {
                        finalNext.classList.add("swiper-button-disabled");
                    } else {
                        finalNext.classList.remove("swiper-button-disabled");
                    }
                };

                swiperInstance.on("init", updateButtons);
                swiperInstance.on("slideChange", updateButtons);
                updateButtons();
            }
        }
    }

    function toggleLayout() {
        const wrapper = sliderEl.querySelector(".swiper-wrapper");
        if (!wrapper) return;

        if (isMobile()) {
            wrapper.style.display = "flex";
            wrapper.style.gap = "0";
        } else {
            const width = window.innerWidth;

            // На 1023px и ниже - 2 колонки
            if (width <= 1023) {
                wrapper.style.display = "grid";
                wrapper.style.gridTemplateColumns = "repeat(2, 1fr)";
                wrapper.style.gap = "24px";
            } else {
                // Больше 1023px - 3 колонки
                wrapper.style.display = "grid";
                wrapper.style.gridTemplateColumns = "repeat(3, 1fr)";
                wrapper.style.gap = "30px";
            }
        }
    }

    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            initSwiper();
            toggleLayout();
        }, 250);
    });

    initSwiper();
    toggleLayout();
}
