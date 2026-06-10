import { Fancybox } from "@fancyapps/ui/dist/fancybox/";

export function popupConsultation(context = document) {
    const triggers = context.querySelectorAll('*[data-src="popup-consultation"]');
    if (!triggers.length) return;

    triggers.forEach((item) => {
        if (item.dataset.init === "true") return;
        item.dataset.init = "true";

        const controller = new AbortController();
        const { signal } = controller;

        item.addEventListener(
            "click",
            (e) => {
                e.preventDefault();
                Fancybox.show([
                    {
                        src: "#popup-consultation",
                        type: "inline"
                    }
                ]);
            },
            { signal }
        );

        item.addEventListener("destroy", () => controller.abort(), { once: true });
    });
}
