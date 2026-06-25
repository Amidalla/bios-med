export function beforeAfterShowMore() {
    document.addEventListener("click", (e) => {
        const button = e.target.closest(".before-after-short__show-more");
        if (!button) return;

        const tabId = button.dataset.tab;
        const grid = document.querySelector(`.before-after-short__grid[data-tab="${tabId}"]`);
        if (!grid) return;

        const hiddenItems = grid.querySelectorAll(".before-after-short__grid-item.hidden");
        if (hiddenItems.length === 0) {
            // Скрываем родительский border-block
            const borderBlock = button.closest(".border-block");
            if (borderBlock) {
                borderBlock.style.display = "none";
            }
            return;
        }

        // Показываем все скрытые элементы
        hiddenItems.forEach(item => {
            item.classList.remove("hidden");
            // Добавляем анимацию появления
            item.style.opacity = "0";
            item.style.transform = "translateY(20px)";
            requestAnimationFrame(() => {
                item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
            });
        });

        // Скрываем родительский border-block
        const borderBlock = button.closest(".border-block");
        if (borderBlock) {
            borderBlock.style.display = "none";
        }
    });
}