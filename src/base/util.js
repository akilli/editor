/**
 * Indicates if given value is defined
 *
 * @param {any} val
 * @return {boolean}
 */
export function is(val) {
    return typeof val !== 'undefined';
}

/**
 * Indicates if given value is a function
 *
 * @param {any} val
 * @return {boolean}
 */
export function isFunction(val) {
    return typeof val === 'function';
}

/**
 * Indicates if given value is a non-empty string
 *
 * @param {any} val
 * @return {boolean}
 */
export function isString(val) {
    return val && typeof val === 'string';
}

/**
 * Indicates if given value is either undefined or a non-empty string
 *
 * @param {any} val
 * @return {boolean}
 */
export function isOptString(val) {
    return !is(val) || isString(val);
}

/**
 * Indicates if given value is either undefined or a non-empty array
 *
 * @param {any} val
 * @return {boolean}
 */
export function isOptArray(val) {
    return !is(val) || (Array.isArray(val) && val.length > 0);
}

/**
 * Indicates if given value is either undefined or an instance of HTMLElement
 *
 * @param {any} val
 * @return {boolean}
 */
export function isOptHtml(val) {
    return !is(val) || val instanceof HTMLElement;
}
