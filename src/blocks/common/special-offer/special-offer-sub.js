import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";

export function specialOfferSubSlider() {
    const sliderEl = document.querySelector(".special-offer-sub-slider");
    if (!sliderEl) return;

    let swiperInstance = null;
    const isMobile = () => window.innerWidth < 760;

    function initSwiper() {
        if (swiperInstance) {
            swiperInstance.destroy(true, true);
            swiperInstance = null;
        }

        if (isMobile()) {
            swiperInstance = new Swiper(sliderEl, {
                slidesPerView: 1.2,
                spaceBetween: 17,
                breakpoints: {
                    420: {
                        slidesPerView: 1.5,
                        spaceBetween: 17
                    },
                    550: {
                        slidesPerView: 1.8,
                        spaceBetween: 17
                    },
                    640: {
                        slidesPerView: 2.2,
                        spaceBetween: 20
                    }
                }
            });

            const prevBtn = document.querySelector(".special-offer-sub-slider__button-prev");
            const nextBtn = document.querySelector(".special-offer-sub-slider__button-next");

            if (prevBtn && nextBtn) {
                const newPrev = prevBtn.cloneNode(true);
                const newNext = nextBtn.cloneNode(true);
                prevBtn.parentNode?.replaceChild(newPrev, prevBtn);
                nextBtn.parentNode?.replaceChild(newNext, nextBtn);

                const finalPrev = document.querySelector(".special-offer-sub-slider__button-prev");
                const finalNext = document.querySelector(".special-offer-sub-slider__button-next");

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

    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            initSwiper();
        }, 250);
    });

    initSwiper();
}