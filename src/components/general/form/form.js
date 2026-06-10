export function form(context = document) {
    const roots = context.querySelectorAll(".form[data-validate]");
    if (!roots.length) return;

    roots.forEach((root) => {
        if (root.dataset.init === "true") return;
        root.dataset.init = "true";

        const controller = new AbortController();
        const { signal } = controller;

        const submitBtn = root.querySelector('[type="submit"]');
        const requiredFields = root.querySelectorAll("[required]");

        const isFieldValid = (field) => {
            if (field.type === "checkbox") return field.checked;

            const value = field.value.trim();
            if (value === "") return false;

            if (field.type === "email") {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            }

            if (field.dataset.mask === "phone") {
                return value.replace(/\D/g, "").length === 11;
            }

            if (field.type === "date") {
                return value !== "";
            }

            if (field.minLength > 0 && value.length < field.minLength) {
                return false;
            }

            return true;
        };

        const updateSubmitState = () => {
            if (!submitBtn) return;
            const allValid = [...requiredFields].every(isFieldValid);
            submitBtn.disabled = !allValid;
        };

        const showError = (wrapper, message) => {
            let hint = wrapper.querySelector(".field-error");
            if (!hint) {
                hint = document.createElement("span");
                hint.className = "field-error";
                wrapper.appendChild(hint);
            }
            hint.textContent = message;
            wrapper.classList.add("invalid");
            wrapper.classList.remove("valid");
        };

        const clearError = (wrapper) => {
            const hint = wrapper.querySelector(".field-error");
            if (hint) hint.remove();
            wrapper.classList.remove("invalid");
            wrapper.classList.add("valid");
        };

        const validateField = (field) => {
            const wrapper = field.closest(".field") || field.closest(".field-consent");
            if (!wrapper) return;

            if (isFieldValid(field)) {
                clearError(wrapper);
                return;
            }

            const message = field.dataset.error || "Заполните поле";
            showError(wrapper, message);
        };

        requiredFields.forEach((field) => {
            const eventType = field.type === "checkbox" ? "change" : "input";

            field.addEventListener(
                eventType,
                () => {
                    validateField(field);
                    updateSubmitState();
                },
                { signal }
            );

            field.addEventListener(
                "blur",
                () => {
                    if (field.type !== "checkbox" && field.value.trim() !== "") {
                        validateField(field);
                    }
                },
                { signal }
            );
        });

        // Валидация при отправке формы
        root.addEventListener(
            "submit",
            (e) => {
                let isValid = true;
                requiredFields.forEach((field) => {
                    validateField(field);
                    if (!isFieldValid(field)) isValid = false;
                });

                if (!isValid) {
                    e.preventDefault();
                    updateSubmitState();
                }
            },
            { signal }
        );

        updateSubmitState();

        root.addEventListener("destroy", () => controller.abort(), { once: true });
    });
}
