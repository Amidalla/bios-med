import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";

export function specialistsShort() {
    const sliderEl = document.querySelector(".specialists-slider");
    if (!sliderEl) return;

    let swiperInstance = null;

    function initSwiper() {
        const windowWidth = window.innerWidth;

        if (windowWidth > 759 && !swiperInstance) {
            const prevBtn = document.querySelector(".specialists-slider__button-prev");
            const nextBtn = document.querySelector(".specialists-slider__button-next");

            swiperInstance = new Swiper(sliderEl, {
                slidesPerView: 1,
                spaceBetween: 20,
                breakpoints: {
                    479: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    750: {
                        slidesPerView: 3,
                        spaceBetween: 12.5
                    },
                    1310: {
                        slidesPerView: 4,
                        spaceBetween: 30
                    }
                }
            });

            if (prevBtn && nextBtn) {
                prevBtn.addEventListener("click", () => swiperInstance.slidePrev());
                nextBtn.addEventListener("click", () => swiperInstance.slideNext());

                const updateButtons = () => {
                    if (swiperInstance.isBeginning) {
                        prevBtn.classList.add("swiper-button-disabled");
                    } else {
                        prevBtn.classList.remove("swiper-button-disabled");
                    }

                    if (swiperInstance.isEnd) {
                        nextBtn.classList.add("swiper-button-disabled");
                    } else {
                        nextBtn.classList.remove("swiper-button-disabled");
                    }
                };

                swiperInstance.on("init", updateButtons);
                swiperInstance.on("slideChange", updateButtons);
                swiperInstance.on("reachBeginning", updateButtons);
                swiperInstance.on("reachEnd", updateButtons);

                updateButtons();
            }
        } else if (windowWidth <= 759 && swiperInstance) {
            swiperInstance.destroy(true, true);
            swiperInstance = null;
        }
    }

    initSwiper();

    window.addEventListener("resize", () => {
        initSwiper();
    });
}
