import { ROUTER } from 'LIBS/consts';
import { isInteger, isNotEmptyString, isObject } from 'LIBS/conditions';

class Router {
  /**
   * @var app object - ссылка на приложение
   * @var currentRoute string - текущий маршрут
   * @var interval.id number - идентификатор установленного интервала
   * @var interval.timout number - период интервала
   * @var mode string - режим
   * @var modeTypes Array - типы режимов
   * @var root string - корневой элемент
   * @var routes Array - список зарегистрированных маршрутов
   */
  #cache = {
    app: null,
    currentPath: null,
    interval: {
      id: null,
      timout: 100,
    },
    mode: window.history.pushState ? ROUTER.modeHistory : ROUTER.modeHash,
    modeTypes: [
      ROUTER.modeHash,
      ROUTER.modeHistory,
    ],
    root: '/',
    routes: [],
  };

  /**
   * Конструктор
   * @param mode string
   * @param root string
   * @param timout number
   */
  constructor({ mode, root, timout } = {}) {
    if (mode) this.mode = mode;
    if (root) this.root = root;
    if (timout) this.timeout = timout;
    else this.#listen();
  };

  /********************************************************************************************************************
   *                                        С Е Т Т Е Р Ы   И   Г Е Т Т Е Р Ы                                         *
   ********************************************************************************************************************/

  set app(value) {
    if (!isObject(value)) return;

    this.#cache.app = value;
  };

  get app() {
    return this.#cache.root;
  };

  set mode(value) {
    const cache = this.#cache;
    if (!cache.modeTypes.includes(value)) return;

    cache.mode = value;
  };

  get mode() {
    return this.#cache.mode;
  };

  set root(value) {
    if (isNotEmptyString(value)) this.#cache.root = value;
  };

  get root() {
    return this.#cache.root;
  };

  set timeout(value) {
    if (!isInteger(value)) return;

    this.#cache.timeout = value;
    this.#listen();
  };

  get timeout() {
    return this.#cache.timeout;
  };

  /********************************************************************************************************************
   *                                         П У Б Л И Ч Н Ы Е   М Е Т О Д Ы                                          *
   ********************************************************************************************************************/

  /**
   * Добавляет маршрут в список
   * @param path string
   * @param callback Function
   * @returns { Router }
   */
  add = (path, callback) => {
    this.#cache.routes.push({ path, callback });
    return this;
  };

  /**
   * Очищает список маршрутов
   * @returns { Router }
   */
  flush = () => {
    this.#cache.routes = [];
    return this;
  };

  /**
   * Перемещает по маршрутам (добавляет маршрут в историю)
   * @param path string
   * @returns { Router }
   */
  navigate = (path = '') => {
    if (this.mode === ROUTER.modeHistory) {
      window.history.pushState(null, null, this.root + this.#clearSlashes(path));
    } else {
      window.location.href = window.location.href.replace(/#(.*)$/, `#${ path }`);
    }
    return this;
  };

  /**
   * Удаляет маршрут из списка
   * @param path string
   * @returns { Router }
   */
  remove = (path) => {
    const { routes } = this.#cache;

    const i = routes.findIndex((route) => route.path === path);
    if (i >= 0) routes.slice(i, 1);
    return this;
  };

  /********************************************************************************************************************
   *                                         П Р И В А Т Н Ы Е   М Е Т О Д Ы                                          *
   ********************************************************************************************************************/

  /**
   * Проверяет соответствие маршрута
   * @param route
   * @returns { boolean }
   */
  #checkRoute = (route) => {
    const match = this.#cache.currentPath.match(route.path);
    if (match) {
      match.shift();
      route.callback.apply({}, match);
      return true;
    }
    return false;
  };

  /**
   * Возвращает путь без слэшей в начале и в конце
   * @param path string
   * @returns { string }
   */
  #clearSlashes = (path) => path.toString()
    .replace(/^\//, '')
    .replace(/\/$/, '');

  /**
   * Возвращает фрагмент маршрута
   * @returns { string }
   */
  #getFragment = () => {
    if (this.mode === ROUTER.modeHistory) {
      const fragment = this.#clearSlashes(this.#getUriWithoutQuery());
      return this.root !== '/' ? this.#clearSlashes(fragment.replace(this.root, '')) : fragment;
    }
    const fragments = window.location.href.match(/#(.*)$/);
    return fragments ? this.#clearSlashes(fragments[1]) : '';
  };

  /**
   * Возвращает URI без запроса
   * @returns { string }
   */
  #getUriWithoutQuery = () => decodeURI(window.location.pathname + window.location.search)
    .replace(/\?(.*)$/, '');

  /**
   * Активирует интервал проверки адресной строки
   */
  #listen = () => {
    const { interval } = this.#cache;

    if (interval.id) clearInterval(interval.id);
    interval.id = setInterval(this.#update, interval.timout);
  };

  /**
   * Обновляет состояние при изменении маршрута
   */
  #update = () => {
    const cache = this.#cache;
    const fragment = this.#getFragment();

    if (!cache.app || cache.currentPath === fragment) return;

    cache.currentPath = fragment;
    cache.routes.some(this.#checkRoute);
  };
}

export {
  Router,
};
