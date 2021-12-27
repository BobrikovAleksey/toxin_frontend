const isArray = (val) => (Array.isArray(val));
const isBoolean = (val) => (typeof val === 'boolean');
const isInteger = (val) => isNumber(val) && val >= 0;
const isNotEmptyString = (val) => ((typeof val === 'string') && (val.length > 0));
const isNumber = (val) => (typeof val === 'number') && !Number.isNaN(val);
const isObject = (val) => (typeof val === 'object');

export {
  isArray,
  isBoolean,
  isInteger,
  isNotEmptyString,
  isNumber,
  isObject,
};
