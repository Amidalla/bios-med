import Swiper from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Fancybox } from "@fancyapps/ui/dist/fancybox/";

export function popupBeforeAfter() {
    const triggers = document.querySelectorAll('[data-src="popup-before-after"]');
    if (!triggers.length) return;

    triggers.forEach((item) => {
        if (item.dataset.init === "true") return;
        item.dataset.init = "true";

        item.addEventListener("click", (e) => {
            e.preventDefault();

            Fancybox.show([
                {
                    src: "#popup-before-after",
                    type: "inline",
                }
            ]);

            const checkInterval = setInterval(() => {
                const popup = document.querySelector("#popup-before-after");

                if (popup && popup.style.display !== "none") {
                    clearInterval(checkInterval);

                    const mainSliderEl = popup.querySelector(".popup-main-slider");
                    const thumbSliderEl = popup.querySelector(".popup-thumb-slider");

                    if (!mainSliderEl || !thumbSliderEl) return;

                    if (mainSliderEl.swiper) mainSliderEl.swiper.destroy(true, true);
                    if (thumbSliderEl.swiper) thumbSliderEl.swiper.destroy(true, true);

                    const thumbSwiper = new Swiper(thumbSliderEl, {
                        slidesPerView: 3,
                        spaceBetween: 12,
                        breakpoints: {
                            0: { slidesPerView: 3, spaceBetween: 8 },
                            480: { slidesPerView: 4, spaceBetween: 10 },
                            768: { slidesPerView: 5, spaceBetween: 12 },
                            1024: { slidesPerView: 6, spaceBetween: 15 }
                        },
                    });

                    const mainSwiper = new Swiper(mainSliderEl, {
                        slidesPerView: 1,
                        spaceBetween: 0,
                        thumbs: {
                            swiper: thumbSwiper,
                        },
                    });

                    // Функция обновления активного класса у миниатюр
                    function updateActiveThumb() {
                        const activeIndex = mainSwiper.activeIndex;
                        const thumbSlides = thumbSliderEl.querySelectorAll(".swiper-slide");
                        thumbSlides.forEach((slide, index) => {
                            if (index === activeIndex) {
                                slide.classList.add("swiper-slide-thumb-active");
                            } else {
                                slide.classList.remove("swiper-slide-thumb-active");
                            }
                        });
                    }

                    // Обновляем активный класс при смене слайда
                    mainSwiper.on("slideChange", updateActiveThumb);
                    mainSwiper.on("init", updateActiveThumb);

                    // Вызываем сразу
                    updateActiveThumb();

                    const prevBtn = popup.querySelector(".popup-main-slider__button-prev");
                    const nextBtn = popup.querySelector(".popup-main-slider__button-next");

                    if (prevBtn && nextBtn) {
                        const newPrev = prevBtn.cloneNode(true);
                        const newNext = nextBtn.cloneNode(true);
                        prevBtn.parentNode?.replaceChild(newPrev, prevBtn);
                        nextBtn.parentNode?.replaceChild(newNext, nextBtn);

                        const finalPrev = popup.querySelector(".popup-main-slider__button-prev");
                        const finalNext = popup.querySelector(".popup-main-slider__button-next");

                        finalPrev.addEventListener("click", () => {
                            mainSwiper.slidePrev();
                        });
                        finalNext.addEventListener("click", () => {
                            mainSwiper.slideNext();
                        });

                        const updateButtons = () => {
                            if (mainSwiper.isBeginning) {
                                finalPrev.classList.add("swiper-button-disabled");
                            } else {
                                finalPrev.classList.remove("swiper-button-disabled");
                            }
                            if (mainSwiper.isEnd) {
                                finalNext.classList.add("swiper-button-disabled");
                            } else {
                                finalNext.classList.remove("swiper-button-disabled");
                            }
                        };

                        mainSwiper.on("init", updateButtons);
                        mainSwiper.on("slideChange", updateButtons);
                        updateButtons();
                    }

                    const thumbSlides = thumbSliderEl.querySelectorAll(".swiper-slide");
                    thumbSlides.forEach((slide, index) => {
                        const newSlide = slide.cloneNode(true);
                        slide.parentNode?.replaceChild(newSlide, slide);

                        newSlide.addEventListener("click", () => {
                            mainSwiper.slideTo(index);
                        });
                    });
                }
            }, 100);
        });
    });
}

export function popupEntry(context = document) {
    const triggers = context.querySelectorAll('[data-src="popup-entry"]');
    if (!triggers.length) return;

    triggers.forEach((item) => {
        if (item.dataset.init === "true") return;
        item.dataset.init = "true";

        item.addEventListener("click", (e) => {
            e.preventDefault();
            Fancybox.close();
            setTimeout(() => {
                Fancybox.show([
                    {
                        src: "#popup-entry",
                        type: "inline"
                    }
                ]);
            }, 300);
        });
    });
}