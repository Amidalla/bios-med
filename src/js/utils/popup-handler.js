import { Fancybox } from "@fancyapps/ui/dist/fancybox/";

/**
 * Универсальный обработчик для всех попапов услуг
 * Открывает попап по его ID из data-атрибута на кнопке
 */
export function initPopupHandler() {
    // Находим все кнопки с атрибутом data-open-popup
    const triggers = document.querySelectorAll('[data-open-popup]');

    // Если кнопок нет - выходим
    if (!triggers.length) return;

    // Проходим по каждой кнопке
    triggers.forEach((trigger) => {
        // Проверяем, не инициализирована ли уже кнопка
        if (trigger.dataset.popupInit === 'true') return;

        // Отмечаем кнопку как инициализированную
        trigger.dataset.popupInit = 'true';

        // Добавляем обработчик клика
        trigger.addEventListener('click', function(event) {
            // Отменяем стандартное поведение кнопки
            event.preventDefault();

            // Получаем ID попапа из атрибута data-popup-id
            const popupId = this.dataset.popupId;

            // Если ID не найден - выходим
            if (!popupId) return;

            // Проверяем, существует ли попап с таким ID в HTML
            const popupElement = document.getElementById(popupId);
            if (!popupElement) {
                console.warn('Попап #' + popupId + ' не найден на странице');
                return;
            }

            // Открываем попап через Fancybox
            Fancybox.show([
                {
                    src: '#' + popupId,
                    type: 'inline'
                }
            ]);
        });
    });
}

// Инициализация при загрузке страницы
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPopupHandler);
} else {
    initPopupHandler();
}

// Для Битрикса: переинициализация после AJAX-подгрузки контента
if (typeof window.BX !== 'undefined') {
    if (window.BX.addCustomEvent) {
        window.BX.addCustomEvent('onAjaxSuccess', function() {
            setTimeout(initPopupHandler, 200);
        });
        window.BX.addCustomEvent('onComponentAjaxComplete', function() {
            setTimeout(initPopupHandler, 200);
        });
    }
}