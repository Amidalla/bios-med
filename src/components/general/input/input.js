import IMask from "imask";
import flatpickr from "flatpickr";
import { Russian } from "flatpickr/dist/l10n/ru.js";

let activeDatePicker = null;

function initMaskedInputs(context, selector, maskOptions) {
    const roots = context.querySelectorAll(selector);
    if (!roots.length) return;

    roots.forEach((root) => {
        if (root.dataset.init === "true") return;
        root.dataset.init = "true";

        const controller = new AbortController();

        IMask(root, maskOptions);

        root.addEventListener("destroy", () => controller.abort(), { once: true });
    });
}

function getMaxDate() {
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 10, 11, 31);
    maxDate.setHours(23, 59, 59, 999);
    return maxDate;
}

function dispatchInputEvent(field) {
    field.dispatchEvent(new Event("input", { bubbles: true }));
}

function getDateFieldFromEvent(target) {
    if (!(target instanceof Element)) return null;

    const field = target.closest('[data-mask="date"]');
    if (field) return field;

    const wrapper = target.closest(".input-wrapper--date");
    return wrapper?.querySelector('[data-mask="date"]') || null;
}

function getAppendTarget(field) {
    return field.closest(".fancybox__dialog") ? field.closest("form") : document.body;
}

function destroyActiveDatePicker() {
    if (!activeDatePicker) return;

    activeDatePicker.destroy();
    activeDatePicker = null;
}

function styleCalendar(instance, appendTo, field) {
    const inFancybox = appendTo !== document.body;
    const getRelativeBottom = (element, relativeTo) => {
        const elementRect = element.getBoundingClientRect();
        const parentRect = relativeTo.getBoundingClientRect();
        return elementRect.bottom - parentRect.top;
    };

    let bottomY;
    if (inFancybox && appendTo) {
        const parent = document.getElementById('popup-entry');
        bottomY = getRelativeBottom(field, parent);
    }

    instance.calendarContainer.classList.toggle("flatpickr-calendar--in-fancybox", inFancybox);
    instance.calendarContainer.style.zIndex = inFancybox ? "30" : "";

    if (inFancybox) {
        setTimeout(() => {
            instance.calendarContainer.style.top = `${bottomY}px`
        }, 100)
    }
}

function openDatePicker(field) {
    if (!field || field.disabled) return;

    const appendTo = getAppendTarget(field);

    if (activeDatePicker?.input === field) {
        if (activeDatePicker.calendarContainer.parentNode !== appendTo) {
            appendTo.appendChild(activeDatePicker.calendarContainer);
        }

        styleCalendar(activeDatePicker, appendTo, field);
        activeDatePicker.open();
        field.focus();
        return;
    }

    destroyActiveDatePicker();

    activeDatePicker = flatpickr(field, {
        locale: Russian,
        dateFormat: "d.m.Y",
        allowInput: true,
        clickOpens: false,
        disableMobile: true,
        minDate: "today",
        maxDate: getMaxDate(),
        appendTo,
        monthSelectorType: "static",
        onOpen: (_, __, instance) => styleCalendar(instance, appendTo, field),
        onChange: () => dispatchInputEvent(field),
        onClose: () => dispatchInputEvent(field)
    });

    activeDatePicker.open();
    field.focus();
}

function bindDatePickerDelegation(context) {
    if (bindDatePickerDelegation.initialized) return;
    bindDatePickerDelegation.initialized = true;

    context.addEventListener(
        "click",
        (event) => {
            const field = getDateFieldFromEvent(event.target);
            if (!field) return;

            event.preventDefault();
            openDatePicker(field);
        },
        true
    );

    const handleFancyboxClose = (dialog) => {
        if (dialog instanceof HTMLDialogElement && dialog.classList.contains("fancybox__dialog")) {
            destroyActiveDatePicker();
        }
    };

    context.addEventListener(
        "close",
        (event) => {
            handleFancyboxClose(event.target);
        },
        true
    );

    context.addEventListener(
        "toggle",
        (event) => {
            if (event.newState === "closed") {
                handleFancyboxClose(event.target);
            }
        },
        true
    );
}

export function input(context = document) {
    bindDatePickerDelegation(context);

    initMaskedInputs(context, '[data-mask="phone"]', {
        mask: "+{7} (000) 000-00-00",
        lazy: true,
        placeholderChar: "_"
    });
}
