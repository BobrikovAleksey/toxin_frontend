import './style';

// Шаблоны для замены переменных
const codePattern = /{{\s*code\s*}}/gi;
const classPattern = /{{\s*colorClass\s*}}/gi;
const titlePattern = /{{\s*title\s*}}/gi;

// Список элементов
const list = [
  {
    code: '#1F2041',
    colorClass: 'color-card__example_dark-shade',
    title: 'Dark Shade 100%',
  }, {
    code: '#1F2041',
    colorClass: 'color-card__example_dark-shade-75',
    title: 'Dark Shade 75%',
  }, {
    code: '#1F2041',
    colorClass: 'color-card__example_dark-shade-50',
    title: 'Dark Shade 50%',
  }, {
    code: '#1F2041',
    colorClass: 'color-card__example_dark-shade-25',
    title: 'Dark Shade 25%',
  }, {
    code: '#1F2041',
    colorClass: 'color-card__example_dark-shade-5',
    title: 'Dark Shade 5%',
  }, {
    code: '#BC9CFF',
    colorClass: 'color-card__example_purple',
    title: 'Purple',
  }, {
    code: '#6FCF97',
    colorClass: 'color-card__example_green',
    title: 'Green',
  },
];

// Шаблон карточки
const cardTemplate = `
  <div class="colors__item color-card">
    <div class="color-card__example {{ colorClass }}"></div>
    <div class="color-card__description">
      <span class="color-card__title">{{ title }}</span>
      <span class="color-card__code">{{ code }}</span>
    </div>
  </div>
`;

// Шаблон
const template = `
  <div class="colors">
    ${ list.reduce((template, el) => template +
        cardTemplate.replace(codePattern, el.code)
          .replace(classPattern, el.colorClass)
          .replace(titlePattern, el.title), '') }
  </div>
`;

export {
  template,
};
