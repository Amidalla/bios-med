import lozad from "lozad";
import { consentNotice } from "../components/general/consent-notice/consent-notice.js";
import { header } from "../blocks/general/header/header.js";
import { popupEntry } from "../components/common/popup-entry/popup-entry.js";
import { form } from "../components/general/form/form.js";
import { input } from "../components/general/input/input.js";
import { menu } from "../components/general/menu/menu.js";
import { navigationMobile } from "../components/general/navigation-mobile/navigation-mobile.js";
import { hero } from "../blocks/common/hero/hero.js";

const components = [
    consentNotice,
    header,
    popupEntry,
    form,
    input,
    menu,
    navigationMobile,
    hero
];

function init(context = document) {
    components.forEach((fn) => fn(context));
}

document.addEventListener("DOMContentLoaded", () => {
    lozad(".lazy", {
        rootMargin: "1200px 1200px",
        threshold: 0.1,
        enableAutoReload: true
    }).observe();

    init();
});