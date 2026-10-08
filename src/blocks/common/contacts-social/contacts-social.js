/**
 * contacts-social.js
 * Скрывает карточки social-card начиная с 5-й и добавляет кнопку «Показать ещё / Свернуть»
 * с плавной анимацией через max-height на контейнере-гриде.
 */
export function contactsSocialToggle(context = document) {
  const section = context.querySelector('.contacts-social');
  if (!section) return;

  const grid = section.querySelector('.contacts-social__grid');
  if (!grid) return;

  const cards = grid.querySelectorAll('.social-card');
  const VISIBLE_COUNT = 4;

  // Если карточек 4 или меньше — кнопка не нужна
  if (cards.length <= VISIBLE_COUNT) return;

  // Находим кнопку-обёртку, добавленную в шаблоне
  const toggleWrapper = section.querySelector('.contacts-social__toggle');
  if (!toggleWrapper) return;

  const toggleBtn = toggleWrapper.querySelector('.contacts-social__toggle-btn');
  if (!toggleBtn) return;

  let expanded = false;

  /**
   * Вычисляет высоту грида, при которой видны только первые VISIBLE_COUNT карточек.
   * Временно скрываем лишние карточки, замеряем высоту, возвращаем обратно.
   */
  function getCollapsedHeight() {
    // Запоминаем текущие стили
    const hiddenCards = [];
    cards.forEach((card, i) => {
      if (i >= VISIBLE_COUNT) {
        hiddenCards.push({ el: card, display: card.style.display });
        card.style.display = 'none';
      }
    });

    const height = grid.scrollHeight;

    // Восстанавливаем
    hiddenCards.forEach(({ el, display }) => {
      el.style.display = display;
    });

    return height;
  }

  // Начальное состояние — свёрнуто, кнопка видна
  toggleWrapper.classList.add('contacts-social__toggle--visible');
  const collapsedHeight = getCollapsedHeight();
  grid.classList.add('contacts-social__grid--collapsible');
  grid.style.maxHeight = collapsedHeight + 'px';

  toggleBtn.addEventListener('click', () => {
    expanded = !expanded;

    if (expanded) {
      // Разворачиваем: ставим max-height = scrollHeight для анимации
      grid.style.maxHeight = grid.scrollHeight + 'px';

      // После окончания анимации убираем max-height чтобы грид мог свободно перестраиваться
      const onEnd = () => {
        if (expanded) {
          grid.style.maxHeight = 'none';
        }
        grid.removeEventListener('transitionend', onEnd);
      };
      grid.addEventListener('transitionend', onEnd);
    } else {
      // Сворачиваем: сначала фиксируем текущую высоту, затем анимируем к collapsed
      grid.style.maxHeight = grid.scrollHeight + 'px';

      // Принудительный reflow чтобы браузер зафиксировал текущее значение
      void grid.offsetHeight;

      grid.style.maxHeight = getCollapsedHeight() + 'px';
    }

    toggleBtn.querySelector('span').textContent = expanded ? 'Свернуть' : 'Показать ещё';
    toggleWrapper.classList.toggle('contacts-social__toggle--expanded', expanded);
  });

  // Пересчитываем collapsed-высоту при ресайзе (адаптив меняет раскладку)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (!expanded) {
        grid.style.maxHeight = getCollapsedHeight() + 'px';
      }
    }, 200);
  });
}
