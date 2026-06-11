export function questions() {
    const items = document.querySelectorAll(".questions__item");

    items.forEach((item) => {
        const question = item.querySelector(".questions__question");

        question.addEventListener("click", () => {
            item.classList.toggle("questions__item--open");
        });
    });
}
