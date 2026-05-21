import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Конфигурация анимаций
const animations = {
    "fade-up": {
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0 }
    },
    "fade-down": {
        from: { opacity: 0, y: -50 },
        to: { opacity: 1, y: 0 }
    },
    "fade-left": {
        from: { opacity: 0, x: -50 },
        to: { opacity: 1, x: 0 }
    },
    "fade-right": {
        from: { opacity: 0, x: 50 },
        to: { opacity: 1, x: 0 }
    },
    fade: {
        from: { opacity: 0 },
        to: { opacity: 1 }
    }
};

export function animate(context = document) {
    const elements = context.querySelectorAll("[data-animate]");

    elements.forEach((el) => {
        if (el.dataset.animateInit === "true") return;
        el.dataset.animateInit = "true";

        const animationType = el.dataset.animate || "fade-up";
        const config = animations[animationType] || animations["fade-up"];

        const duration = parseFloat(el.dataset.animateDuration) || 0.8;
        const delay = parseFloat(el.dataset.animateDelay) || 0;
        const start = el.dataset.animateStart || "top 90%";

        gsap.set(el, config.from);

        gsap.to(el, {
            ...config.to,
            duration,
            delay,
            ease: "power2.out",
            scrollTrigger: {
                trigger: el,
                start,
                toggleActions: "play none none none",
                once: true
            }
        });
    });
}
