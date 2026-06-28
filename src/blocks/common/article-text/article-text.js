export function articleTextToggle() {
    // Находим все кнопки с data-toggle-btn
    const toggleBtns = document.querySelectorAll('[data-toggle-btn]');

    toggleBtns.forEach(toggleBtn => {
        // Находим родительскую секцию
        const section = toggleBtn.closest('.article-text');
        if (!section) return;

        // Находим скрытый контент внутри этой секции
        const hiddenContent = section.querySelector('[data-hidden-content]');
        const borderBlock = toggleBtn.closest('.border-block');

        if (!hiddenContent || !borderBlock) return;

        toggleBtn.addEventListener('click', function() {
            const isOpen = hiddenContent.classList.contains('is-open');

            if (isOpen) {
                // Закрываем
                hiddenContent.classList.remove('is-open');
                borderBlock.classList.remove('is-open');
                section.classList.remove('is-open');
                this.querySelector('span').textContent = 'Подробнее';

                setTimeout(() => {
                    hiddenContent.style.overflow = 'hidden';
                }, 100);
            } else {
                // Открываем
                hiddenContent.style.overflow = 'hidden';
                hiddenContent.classList.add('is-open');
                borderBlock.classList.add('is-open');
                section.classList.add('is-open');
                this.querySelector('span').textContent = 'Скрыть';

                setTimeout(() => {
                    hiddenContent.style.overflow = 'visible';
                }, 700);
            }
        });
    });
}