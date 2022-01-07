const isApp = (app) => isObject(app) && (app.constructor.name === 'App');
const isArray = (list) => (Array.isArray(list));
const isBoolean = (bool) => (typeof bool === 'boolean');
const isFunction = (func) => (typeof func === 'function');
const isInteger = (numb) => isNumber(numb) && numb >= 0;
const isNotEmptyString = (str) => ((typeof str === 'string') && (str.length > 0));
const isNumber = (numb) => (typeof numb === 'number') && !Number.isNaN(numb);
const isObject = (obj) => (typeof obj === 'object') && (obj !== null);
const isRouter = (router) => isObject(router) && (router.constructor.name === 'Router');

export {
  isApp,
  isArray,
  isBoolean,
  isFunction,
  isInteger,
  isNotEmptyString,
  isNumber,
  isObject,
  isRouter,
};
