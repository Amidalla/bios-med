export function priceList(context = document) {
    // Инициализация табов
    const tabs = context.querySelectorAll('.price-list__tab');
    if (tabs.length) {
        tabs.forEach((tab) => {
            if (tab.dataset.init === "true") return;
            tab.dataset.init = "true";

            tab.addEventListener('click', () => {
                // Убираем активный класс у всех табов
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Скрываем все панели
                const target = tab.dataset.tab;
                const panels = context.querySelectorAll('.price-list__panel');
                panels.forEach(panel => {
                    panel.classList.remove('active');
                    if (panel.dataset.panel === target) {
                        panel.classList.add('active');
                    }
                });
            });
        });
    }

    // Инициализация аккордионов
    const accordionHeaders = context.querySelectorAll('.accordion__header');
    if (accordionHeaders.length) {
        accordionHeaders.forEach((header) => {
            if (header.dataset.init === "true") return;
            header.dataset.init = "true";

            header.addEventListener('click', () => {
                const accordion = header.closest('.accordion');
                accordion.classList.toggle('active');
            });
        });
    }
}