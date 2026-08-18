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

function getDateFieldWrapper(field) {
    return field.closest(".input-wrapper--date");
}

function isInFancybox(field) {
    return Boolean(field.closest(".fancybox__dialog"));
}

function getAppendTarget(field) {
    return isInFancybox(field) ? getDateFieldWrapper(field) : document.body;
}

function destroyActiveDatePicker() {
    if (!activeDatePicker) return;

    activeDatePicker.destroy();
    activeDatePicker = null;
}

function updateCalendarMonthLabel(instance) {
    const label = instance.calendarContainer.querySelector(".flatpickr-month-heading");
    if (!label) return;

    const months = instance.l10n.months.longhand;
    label.textContent = `${months[instance.currentMonth]} ${instance.currentYear}`;
}

function ensureCalendarMonthLabel(instance) {
    let label = instance.calendarContainer.querySelector(".flatpickr-month-heading");

    if (!label) {
        label = document.createElement("div");
        label.className = "flatpickr-month-heading";
        label.setAttribute("aria-live", "polite");

        const weekdays = instance.calendarContainer.querySelector(".flatpickr-weekdays");
        weekdays?.parentNode?.insertBefore(label, weekdays);
    }

    updateCalendarMonthLabel(instance);
}

function positionCalendarInWrapper(instance, field, wrapper) {
    const calendar = instance.calendarContainer;
    const gap = 8;
    const fieldRect = field.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();
    const calendarWidth = calendar.offsetWidth;
    const wrapperWidth = wrapper.clientWidth;

    let left = fieldRect.left - wrapperRect.left + wrapper.scrollLeft;
    left = Math.max(0, Math.min(left, wrapperWidth - calendarWidth));

    calendar.style.position = "absolute";
    calendar.style.top = `${fieldRect.bottom - wrapperRect.top + wrapper.scrollTop + gap}px`;
    calendar.style.left = `${left}px`;
    calendar.style.right = "auto";
    calendar.style.bottom = "auto";
}

function prepareCalendar(instance, field, appendTo, inFancybox) {
    instance.calendarContainer.classList.toggle("flatpickr-calendar--in-fancybox", inFancybox);

    if (inFancybox) {
        instance.calendarContainer.style.zIndex = "30";
        positionCalendarInWrapper(instance, field, appendTo);
    } else {
        instance.calendarContainer.style.zIndex = "";
    }
}

function openDatePicker(field) {
    if (!field || field.disabled) return;

    const inFancybox = isInFancybox(field);
    const appendTo = getAppendTarget(field);

    if (!appendTo) return;

    if (activeDatePicker?.input === field) {
        if (activeDatePicker.calendarContainer.parentNode !== appendTo) {
            appendTo.appendChild(activeDatePicker.calendarContainer);
        }

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
        animate: !inFancybox,
        position: inFancybox
            ? (instance) => positionCalendarInWrapper(instance, field, appendTo)
            : "auto",
        monthSelectorType: "static",
        onReady: (_, __, instance) => ensureCalendarMonthLabel(instance),
        onOpen: (_, __, instance) => {
            ensureCalendarMonthLabel(instance);
            prepareCalendar(instance, field, appendTo, inFancybox);
        },
        onMonthChange: (_, __, instance) => updateCalendarMonthLabel(instance),
        onYearChange: (_, __, instance) => updateCalendarMonthLabel(instance),
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
