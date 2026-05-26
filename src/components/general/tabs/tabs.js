export function tabs() {
    const tabsContainers = document.querySelectorAll('[data-tabs]');

    tabsContainers.forEach(container => {
        const btns = container.querySelectorAll('[data-tab-btn]');
        const panels = container.querySelectorAll('[data-tab-panel]');

        function switchTab(tabId) {
            // Скрыть все панели
            panels.forEach(panel => {
                panel.style.display = 'none';
                panel.classList.remove('active');
            });

            // Убрать активный класс у всех кнопок
            btns.forEach(btn => {
                btn.classList.remove('active');
            });

            // Показать выбранную панель
            const activePanel = container.querySelector(`[data-tab-panel="${tabId}"]`);
            if (activePanel) {
                activePanel.style.display = 'block';
                activePanel.classList.add('active');
            }

            // Активировать кнопку
            const activeBtn = container.querySelector(`[data-tab-btn="${tabId}"]`);
            if (activeBtn) {
                activeBtn.classList.add('active');
            }
        }

        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab-btn');
                switchTab(tabId);
            });
        });
    });
}