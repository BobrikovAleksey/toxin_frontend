import './style';

// Список элементов
const list = [
  {
    example: `<h1 class="type-card__example">
        This one is the sub-section or widget title
      </h1>`,
    typeClass: 'type-card__title_h1',
    title: 'H1',
  }, {
    example: `<h2 class="type-card__example">
        Next one is the item title inside widgets
      </h2>`,
    typeClass: 'type-card__title_h2',
    title: 'H2',
  }, {
    example: `<h3 class="type-card__example">
        This is a label or CTA text
      </h3>`,
    typeClass: 'type-card__title_h3',
    title: 'H3',
  }, {
    example: `<p class="type-card__example">
        This is the body text which is used for most<br>of the design, like paragraphs, lists, etc.
      </p>`,
    typeClass: 'type-card__title_body',
    title: 'Body',
  },
];

// Шаблоны для замены переменных
const examplePattern = /{{\s*example\s*}}/gi;
const classPattern = /{{\s*typeClass\s*}}/gi;
const titlePattern = /{{\s*title\s*}}/gi;

// Шаблон типа
const cardTemplate = `
  <div class="types__item type-card">
    <div class="type-card__title {{ typeClass }}">{{ title }}</div>
    {{ example }}
  </div>
`;

// Шаблон
const template = `
  <div class="types">
    ${ list.reduce((template, el) => template +
        cardTemplate.replace(examplePattern, el.example)
          .replace(classPattern, el.typeClass)
          .replace(titlePattern, el.title), '') }
  </div>
`;

export {
  template,
};
