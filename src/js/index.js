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
import { popupIncrease } from "../components/common/popup-increase/popup-increase.js";
import { popupLipofilling } from "../components/common/popup-lipofilling/popup-lipofilling.js";
import { popupGluteoplasty } from "../components/common/popup-gluteoplasty/popup-gluteoplasty.js";
import { popupButterfly } from "../components/common/popup-butterfly/popup-butterfly.js";
import { surgeonsEnlargemen } from "../blocks/common/surgeons-enlargemen/surgeons-enlargemen.js";
import { advantagesVideo } from "../blocks/common/advantages/about-advantages.js";
import { operationalExaminationSlider } from "../blocks/common/operational-examination/operational-examination.js";
import { aboutExcellenceSlider } from "../blocks/common/about-excellence/about-excellence.js";
import { officialDocumentsSlider } from "../blocks/common/official-documents/official-documents.js";
import {
    beforeAfterDescriptionSlider
} from "../blocks/common/before-after-description/before-after-description-slider.js";
import { breastBeforeAfterSlider } from "../blocks/common/breast-before-after/breast-before-after.js";
import { bodyBeforeAfterSlider } from "../blocks/common/body-before-after/body-before-after.js";
import { specialOfferSlider } from "../blocks/common/special-offer/special-offer.js";
import { popupBeforeAfter } from "../components/common/popup-before-after/popup-before-after.js";
import { priceList } from "../blocks/common/price-list/price-list.js";
import { specialOfferSubSlider } from "../blocks/common/special-offer/special-offer-sub.js";
import { paymentMethodsSlider } from "../blocks/common/payment-methods/payment-methods.js";
import { beforeAfterShowMore } from "../blocks/common/before-after-short/before-after-doctor.js";

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
    questions,
    popupIncrease,
    popupLipofilling,
    popupGluteoplasty,
    popupButterfly,
    surgeonsEnlargemen,
    advantagesVideo,
    operationalExaminationSlider,
    aboutExcellenceSlider,
    officialDocumentsSlider,
    beforeAfterDescriptionSlider,
    breastBeforeAfterSlider,
    bodyBeforeAfterSlider,
    specialOfferSlider,
    popupBeforeAfter,
    priceList,
    specialOfferSubSlider,
    paymentMethodsSlider,
    beforeAfterShowMore
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
