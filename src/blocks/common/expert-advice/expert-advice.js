import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";

export function expertAdvice() {
    const sliderEl = document.querySelector(".expert-advice-slider");
    if (!sliderEl) return;

    let swiperInstance = null;

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
            }
        });

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
    }

    initSwiper();
    window.addEventListener("resize", () => initSwiper());
}
