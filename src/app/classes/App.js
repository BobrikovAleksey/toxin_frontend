import { isArray, isFunction, isNotEmptyString, isObject, isRouter } from 'LIBS/conditions';
import { NAMES } from 'LIBS/consts';

// Основной шаблон
const template = `
  <x-header></x-header>
  <main></main>
  <x-footer></x-footer>
`;

class App {
  /**
   * @var components object - экземпляры классов компонентов
   * @var views object - экземпляры классов представлений
   */
  #classes = {
    components: {},
    views: {},
  };

  /**
   * @var components object - кэшируемые компоненты
   * @var elements object - кэшируемые элементы
   * @var router Router - ссылка на роутер
   * @var tags Array - список тегов-компонентов
   * @var views object - представления
   */
  #cache = {
    components: {},
    elements: {
      $main: null,
    },
    router: null,
    tags: {},
    views: {
      $current: null,
    },
  };

  /**
   * Конструктор
   * @param router Router
   * @param components object - экземпляры классов компонентов
   * @param views object - экземпляры классов представлений
   */
  constructor({ router = null, components = null, views = null } = {}) {
    this.$router = router;
    this.#addViewClasses(views);
    this.#addComponentClasses(components);
  };

  /**
   * Инициализирует приложение
   */
  init = () => {
    const el = document.querySelector('#app');
    el.insertAdjacentHTML('afterend', template);
    el.parentNode.removeChild(el);
  };

  /********************************************************************************************************************
   *                                        С Е Т Т Е Р Ы   И   Г Е Т Т Е Р Ы                                         *
   ********************************************************************************************************************/

  get $main() {
    const { elements } = this.#cache;

    if (!elements.$main) elements.$main = document.querySelector('main');
    return elements.$main;
  };

  set $router(value) {
    if (!isRouter(value)) return;

    this.#cache.router = value;
    value.app = this;
  };

  get $router() {
    return this.#cache.router;
  };

  get components() {
    return this.#cache.components;
  };

  get views() {
    return this.#cache.views;
  };

  get url() {
    const { $router } = this;

    if (!$router) return '/';

    return $router.root;
  };

  /********************************************************************************************************************
   *                                         П У Б Л И Ч Н Ы Е   М Е Т О Д Ы                                          *
   ********************************************************************************************************************/

  /**
   * Кэширует представление
   * @param view BaseView
   */
  cacheView = (view) => {
    if (view.name === NAMES.anonymous) return;

    this.#cache.views[view.name] = view;
  };

  /**
   * Возвращает сформированный шаблон html-элемента
   * @param component [ BaseView | BaseComponent ]
   */
  getTemplate = (component) => {
    const { $app, props, template } = component;

    const mainTemplate = template?.main ?? template;
    if (!isNotEmptyString(mainTemplate)) return '';

    const list = props?.list ?? [];
    const itemListTemplate = template?.itemList ?? '';
    const urlPattern = /{{\s*url\s*}}/g;
    if (!isArray(list) || !isNotEmptyString(itemListTemplate)) return mainTemplate.replace(urlPattern, $app.url);

    const listPattern = /{{\s*list\s*}}/g;
    const listTemplate = itemListTemplate.repeat(list.length);
    return template.replace(listPattern, listTemplate).replace(urlPattern, $app.url);
  };

  /**
   * Отображает представление
   * @param viewName string
   * @param props object
   */
  renderView = (viewName, props = {}) => {
    const Views = this.#classes.views;
    const { $main, views } = this;

    if (!$main) return;

    views.$current?.hide();
    if (!views[viewName]) {
      const View = Views[viewName];
      (new View({
        app: this,
        cache: views,
        props,
      })).init();
    } else {
      views[viewName].show();
    }
    views.$current = views[viewName] ?? null;
  };

  /********************************************************************************************************************
   *                                         П Р И В А Т Н Ы Е   М Е Т О Д Ы                                          *
   ********************************************************************************************************************/

  /**
   * Добавляет экземпляры классов в определенную группу
   * @param type string
   * @param classList object
   */
  #addClasses = (type, classList) => {
    const classes = this.#classes[type];

    if (!isObject(classList) || !classes) return;

    for (const key in classList) {
      if (isFunction(classList[key])) classes[key] = classList[key];
    }
  };

  /**
   * Добавляет экземпляры классов компонентов
   * @param classList object
   */
  #addComponentClasses = (classList) => {
    this.#addClasses('components', classList);
    this.#makeTags();
  };

  /**
   * Добавляет экземпляры классов представлений
   * @param classList object
   */
  #addViewClasses = (classList) => {
    this.#addClasses('views', classList);
  };

  /**
   * Составляет список тегов-компонентов
   */
  #makeTags = () => {
    const { components } = this.#classes;
    const { tags } = this.#cache;

    for (const key in components) {
      const tag = components[key].getTagName();
      tags[tag] = key;
    }
  };
}

export {
  App,
};
