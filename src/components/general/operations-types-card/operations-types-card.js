export function initExpandButtons() {
    const expandButtons = document.querySelectorAll(".operations-types-card__read-more");

    expandButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const textBlock = button
                .closest(".operations-types-card__text-wrapper")
                .querySelector(".operations-types-card__text");

            if (textBlock.classList.contains("expanded")) {
                textBlock.classList.remove("expanded");
                button.textContent = "Читать все";
            } else {
                textBlock.classList.add("expanded");
                button.textContent = "Скрыть";
            }
        });
    });
}
