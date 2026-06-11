import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";

export function surgeons() {
    const sliderEl = document.querySelector(".surgeons-slider");
    if (!sliderEl) return;

    let swiperInstance = null;

    function initSwiper() {
        if (swiperInstance) {
            swiperInstance.destroy(true, true);
            swiperInstance = null;
        }

        const prevBtn = document.querySelector(".surgeons-slider__button-prev");
        const nextBtn = document.querySelector(".surgeons-slider__button-next");

        swiperInstance = new Swiper(sliderEl, {
            slidesPerView: 1,
            spaceBetween: 20,
            breakpoints: {
                1050: {
                    slidesPerView: 1.5,
                    spaceBetween: 20
                },
                1309: {
                    slidesPerView: 1.8,
                    spaceBetween: 20
                },
                1669: {
                    slidesPerView: 2,
                    spaceBetween: 22
                }
            }
        });

        if (prevBtn && nextBtn) {
            const oldPrev = prevBtn.cloneNode(true);
            const oldNext = nextBtn.cloneNode(true);
            prevBtn.parentNode.replaceChild(oldPrev, prevBtn);
            nextBtn.parentNode.replaceChild(oldNext, nextBtn);

            const newPrev = document.querySelector(".surgeons-slider__button-prev");
            const newNext = document.querySelector(".surgeons-slider__button-next");

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
