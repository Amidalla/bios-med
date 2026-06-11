import lozad from "lozad";
import { consentNotice } from "../components/general/consent-notice/consent-notice.js";
import { header } from "../blocks/general/header/header.js";
import { popupEntry } from "../components/common/popup-entry/popup-entry.js";
import { popupConsultation } from "../components/common/popup-consultation/popup-consultation.js";
import { form } from "../components/general/form/form.js";
import { input } from "../components/general/input/input.js";
import { menu } from "../components/general/menu/menu.js";
import { navigationMobile } from "../components/general/navigation-mobile/navigation-mobile.js";
import { hero } from "../blocks/common/hero/hero.js";
import { tabs } from "../components/general/tabs/tabs.js";
import { specialistsShort } from "../blocks/common/specialists-short/specialists-short.js";
import { reviewsShort } from "../blocks/common/reviews-short/reviews-short.js";
import { storiesShort } from "../blocks/common/stories-short/stories-short.js";
import { initReadMoreButtons } from "../components/general/video-review-card/video-review-card.js";
import { articleShort } from "../blocks/common/article-short/article-short.js";
import { servicesCategories } from "../blocks/common/services-categories/services-categories.js";
import { bodyPlasticShort } from "../blocks/common/body-plastic-short/body-plastic-short.js";
import { preparingSurgery } from "../blocks/common/preparing-surgery/preparing-surgery.js";
import { popupFindMore } from "../components/common/popup-find-more/popup-find-more.js";
import { popupWhatThis } from "../components/common/popup-what-this/popup-what-this.js";
import { popupWhoSuitable } from "../components/common/popup-who-suitable/popup-who-suitable.js";
import { popupReconstructiveRhinoplasty } from "../components/common/popup-reconstructive-rhinoplasty/popup-reconstructive-rhinoplasty.js";
import { initExpandButtons } from "../components/general/operations-types-card/operations-types-card.js";
import { popupRehabilitation } from "../components/common/popup-rehabilitation/popup-rehabilitation.js";
import { surgeons } from "../blocks/common/surgeons/surgeons.js";
import { expertAdvice } from "../blocks/common/expert-advice/expert-advice.js";
import { questions } from "../blocks/common/questions/questions.js";

const components = [
    consentNotice,
    header,
    popupEntry,
    popupConsultation,
    form,
    input,
    menu,
    navigationMobile,
    hero,
    tabs,
    specialistsShort,
    reviewsShort,
    storiesShort,
    initReadMoreButtons,
    articleShort,
    servicesCategories,
    bodyPlasticShort,
    preparingSurgery,
    popupFindMore,
    popupWhatThis,
    popupWhoSuitable,
    popupReconstructiveRhinoplasty,
    initExpandButtons,
    popupRehabilitation,
    surgeons,
    expertAdvice,
    questions
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
