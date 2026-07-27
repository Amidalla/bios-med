import { Fancybox } from "@fancyapps/ui/dist/fancybox/";

const POPUP_SELECTOR = "#popup-reconstructive-rhinoplasty";

function getImageSrc(img) {
    return img.currentSrc || img.getAttribute("src") || img.getAttribute("data-src") || "";
}

function openGallery(images, startIndex) {
    const items = images
        .map((img) => getImageSrc(img))
        .filter(Boolean)
        .map((src) => ({ src, type: "image" }));

    if (!items.length) return;

    Fancybox.show(items, {
        startIndex: Math.max(0, Math.min(startIndex, items.length - 1)),
        animated: true,
        Hash: false,
        Thumbs: false,
        Toolbar: {
            display: {
                left: [],
                middle: [],
                right: ["close"]
            }
        }
    });
}

/**
 * Любой <img> внутри модалки открывается в Fancybox по клику.
 * Контент-менеджеру достаточно вставить картинки из админки — без классов и data-атрибутов.
 */
export function popupReconstructiveRhinoplasty(context = document) {
    const popup = context.querySelector?.(POPUP_SELECTOR) || document.querySelector(POPUP_SELECTOR);
    if (!popup || popup.dataset.imagesInit === "true") return;

    popup.dataset.imagesInit = "true";

    popup.addEventListener("click", (event) => {
        const img = event.target.closest("img");
        if (!img || !popup.contains(img)) return;

        event.preventDefault();
        event.stopPropagation();

        const images = [...popup.querySelectorAll("img")];
        const startIndex = images.indexOf(img);

        openGallery(images, startIndex);
    });
}

if (typeof window.BX !== "undefined" && window.BX.addCustomEvent) {
    const reinit = () => {
        const popup = document.querySelector(POPUP_SELECTOR);
        if (popup) delete popup.dataset.imagesInit;
        popupReconstructiveRhinoplasty();
    };

    window.BX.addCustomEvent("onAjaxSuccess", () => setTimeout(reinit, 200));
    window.BX.addCustomEvent("onComponentAjaxComplete", () => setTimeout(reinit, 200));
}
