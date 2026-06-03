/**
 * Показать уведомление "Добавлено" рядом с кнопкой добавления в корзину
 * @param {HTMLElement} button - Кнопка .add-to-cart
 * @param {string} [text="Добавлено"] - Текст уведомления
 */
export function showAddedToCart(button, { text = "добавлено" } = {}) {
    const td = button.closest("td");
    if (!td) return;

    const existing = td.querySelector(".added-label");
    if (existing) return;

    const row = button.closest("tr");
    if (row) row.classList.add("is-added");

    const label = document.createElement("span");
    label.className = "added-label";
    label.textContent = text;
    td.insertBefore(label, button);
}
