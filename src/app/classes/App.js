import { isFunction, isObject, isRouter } from 'LIBS/conditions';

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
    elements: {},
    router: null,
    tags: {},
    views: {},
  };

  /**
   * Конструктор
   * @param router Router
   * @param components object - экземпляры классов компонентов
   * @param views object - экземпляры классов представлений
   */
  constructor({ router = null, components = null, views = null } = {}) {
    this.$router = router;
    this.#addComponentClasses(components);
    this.#addViewClasses(views);
  };

  /********************************************************************************************************************
   *                                        С Е Т Т Е Р Ы   И   Г Е Т Т Е Р Ы                                         *
   ********************************************************************************************************************/

  get $main() {
    const { elements } = this.#cache;

    if (!elements.main) elements.main = document.querySelector('main');
    return elements.main;
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
   * Инициализирует приложение
   */
  init = () => {
    const el = document.querySelector('#app');
    el.insertAdjacentHTML('afterend', template);
    el.parentNode.removeChild(el);
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
