import { Fancybox } from "@fancyapps/ui/dist/fancybox/";

export function popupEntry(context = document) {

    context.addEventListener('click', function(e) {

        const trigger = e.target.closest('*[data-src="popup-entry"]');
        if (!trigger) return;

        e.preventDefault();

        Fancybox.show([
            {
                src: "#popup-entry",
                type: "inline"
            }
        ]);
    });
}