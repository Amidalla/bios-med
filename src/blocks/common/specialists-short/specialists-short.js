import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

export function specialistsShort() {
    const sliderEl = document.querySelector('.specialists-slider');
    if (!sliderEl) return;

    const prevBtn = document.querySelector('.specialists-slider__button-prev');
    const nextBtn = document.querySelector('.specialists-slider__button-next');

    const swiper = new Swiper(sliderEl, {
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            1280: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
        },
    });

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => swiper.slidePrev());
        nextBtn.addEventListener('click', () => swiper.slideNext());
    }
}