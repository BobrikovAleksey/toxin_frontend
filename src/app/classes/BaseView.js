import { isApp, isArray, isNotEmptyString, isObject } from 'LIBS/conditions';
import { APP_CLASSES, NAMES } from 'LIBS/consts';

class BaseView {
  /**
   * @var data object - данные
   * @var methods object - методы
   */
  data = {};
  methods = {};

  /**
   * @var name string - уникальное имя
   * @var app object - ссылка на приложение
   * @var el Element - ссылка на связанный html-элемент
   * @var components object - дочерние компоненты
   * @var defProps object - значения свойств по умолчанию
   * @var props object - свойства
   * @var template string - шаблон
   */
  #cache = {
    name: NAMES.anonymous,
    app: null,
    el: null,
    components: {},
    defProps: {},
    props: {},
    template: '',
  };

  /**
   * Конструктор
   * @param app object
   * @param props object
   */
  constructor({ app, props }) {
    const cache = this.#cache;

    if (isApp(app)) cache.app = app;
    this.addProps({ ...cache.defProps, ...props });
  };

  /**
   * Инициализирует представление
   */
  init = () => {
    const cache = this.#cache;
    const { $app } = this;
    const { $main } = $app;

    this.name = this.constructor['name'];
    $main.insertAdjacentHTML('beforeend', $app.getTemplate(this));
    cache.el = $main.lastElementChild;
    $app.cacheView(this);
  };

  /********************************************************************************************************************
   *                                        С Е Т Т Е Р Ы   И   Г Е Т Т Е Р Ы                                         *
   ********************************************************************************************************************/

  get $app() {
    return this.#cache.app;
  };

  get $el() {
    return this.#cache.el;
  };

  get $router() {
    return this.$app?.$router ?? null;
  };

  get components() {
    return this.#cache.components;
  };

  set defProps(value) {
    if (!isObject(value)) return;

    this.#cache.defProps = value;
  };

  get defProps() {
    return this.#cache.defProps;
  };

  set name(value) {
    if (!isNotEmptyString(value)) return;

    this.#cache.name = value;
  };

  get name() {
    return this.#cache.name;
  };

  get props() {
    return this.#cache.props;
  };

  set template(value) {
    if (!isNotEmptyString(value)) return;

    this.#cache.template = value;
  };

  get template() {
    return this.#cache.template;
  };

  /********************************************************************************************************************
   *                                         П У Б Л И Ч Н Ы Е   М Е Т О Д Ы                                          *
   ********************************************************************************************************************/

  /**
   * Добавляет свойства
   * @param props object
   */
  addProps = (props) => {
    const cache = this.#cache;

    if (!isObject(props)) return;

    cache.props = { ...cache.props, ...props };
  };

  /**
   * Очищает свойства
   * @param props object
   */
  flushProps = (props) => {
    this.#cache.props = { ...this.defProps };
  };

  /**
   * Скрывает представление
   */
  hide = () => {
    const { $el } = this.#cache;

    if ($el && !$el.classList.contains(APP_CLASSES.hide)) $el.classList.add(APP_CLASSES.hide);
  };

  /**
   * Удаляет свойства
   * @param propNames Array
   */
  removeProps(propNames) {
    if (!isArray(propNames)) return;

    propNames.forEach(this.#removeProp);
  };

  /**
   * Отображает представление
   */
  show = () => {
    const { $el } = this.#cache;

    if ($el?.classList.contains(APP_CLASSES.hide)) $el.classList.remove(APP_CLASSES.hide);
  };

  /********************************************************************************************************************
   *                                         П Р И В А Т Н Ы Е   М Е Т О Д Ы                                          *
   ********************************************************************************************************************/

  /**
   * Callback-функция для удаления свойств представления
   * @param propName
   */
  #removeProp = (propName) => {
    const { defProps } = this;
    const { props } = this.#cache;

    if (!props.hasOwnProperty(propName)) return;

    if (!defProps.hasOwnProperty(propName)) delete props[propName];
    else props[propName] = defProps[propName];
  };
}

export {
  BaseView,
};
