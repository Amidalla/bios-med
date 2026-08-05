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

        const label = toggleBtn.querySelector("span") || toggleBtn;

        toggleBtn.addEventListener("click", () => {
            const isOpen = hiddenContent.classList.contains("is-open");

            if (isOpen) {
                hiddenContent.style.maxHeight = `${hiddenContent.scrollHeight}px`;
                // Force reflow before collapsing
                hiddenContent.offsetHeight;

                hiddenContent.classList.remove("is-open");
                borderBlock.classList.remove("is-open");
                section.classList.remove("is-open");
                hiddenContent.style.maxHeight = "0px";
                label.textContent = "Подробнее";
            } else {
                hiddenContent.classList.add("is-open");
                borderBlock.classList.add("is-open");
                section.classList.add("is-open");
                hiddenContent.style.maxHeight = `${hiddenContent.scrollHeight}px`;
                label.textContent = "Скрыть";
            }
        });
    });
}
