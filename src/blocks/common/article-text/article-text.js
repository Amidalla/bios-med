export function articleTextToggle() {
    const toggleBtns = document.querySelectorAll("[data-toggle-btn]");

    toggleBtns.forEach((toggleBtn) => {
        if (toggleBtn.dataset.init === "true") return;
        toggleBtn.dataset.init = "true";

        const section = toggleBtn.closest(".article-text, .about-short");
        if (!section) return;

        const hiddenContent = section.querySelector("[data-hidden-content]");
        const borderBlock = toggleBtn.closest(".border-block");

        if (!hiddenContent || !borderBlock) return;

        toggleBtn.addEventListener("click", function () {
            const isOpen = hiddenContent.classList.contains("is-open");

            if (isOpen) {
                hiddenContent.classList.remove("is-open");
                borderBlock.classList.remove("is-open");
                section.classList.remove("is-open");
                this.querySelector("span").textContent = "Подробнее";

                setTimeout(() => {
                    hiddenContent.style.overflow = "hidden";
                }, 100);
            } else {
                hiddenContent.style.overflow = "hidden";
                hiddenContent.classList.add("is-open");
                borderBlock.classList.add("is-open");
                section.classList.add("is-open");
                this.querySelector("span").textContent = "Скрыть";

                setTimeout(() => {
                    hiddenContent.style.overflow = "visible";
                }, 700);
            }
        });
    });
}