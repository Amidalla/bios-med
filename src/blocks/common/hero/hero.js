import Swiper from "swiper";
import { Autoplay } from "swiper/modules";

export function hero(context = document) {
    const root = context.querySelector(".hero");
    if (!root || root.dataset.init === "true") return;

    root.dataset.init = "true";

    const slider = root.querySelector(".slider");
    if (!slider) return;

    const swiper = new Swiper(slider, {
        modules: [Autoplay],
        slidesPerView: 1.3,
        spaceBetween: 16,
        speed: 800,
        breakpoints: {
            0: {
                slidesPerView: 1.3,
                spaceBetween: 16
            },
            480: {
                slidesPerView: 1.3,
                spaceBetween: 16
            },
            1310: {
                slidesPerView: 2.8,
                spaceBetween: 16
            },
            1670: {
                slidesPerView: 3.2,
                spaceBetween: 16
            }
        }
    });

    // Очистка при уничтожении компонента
    root.addEventListener(
        "destroy",
        () => {
            if (swiper && !swiper.destroyed) {
                swiper.destroy(true, true);
            }
        },
        { once: true }
    );
}