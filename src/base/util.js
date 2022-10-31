/**
 * Indicates if keyboard event was triggered for given key combination
 *
 * @param {KeyboardEvent} event
 * @param {string|string[]} key
 * @param {boolean} alt
 * @param {boolean} ctrl
 * @param {boolean} shift
 * @return {boolean}
 */
export function isKey(event, key, { alt = false, ctrl = false, shift = false } = {}) {
    return (Array.isArray(key) && key.includes(event.key) || event.key === key)
        && event.altKey === alt
        && event.ctrlKey === ctrl
        && event.shiftKey === shift;
}

/**
 * Indicates if given value is undefined
 *
 * @param {any} val
 * @return {boolean}
 */
export function not(val) {
    return typeof val === 'undefined';
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
    return not(val) || isString(val);
}

/**
 * Indicates if given value is either undefined or a non-empty array
 *
 * @param {any} val
 * @return {boolean}
 */
export function isOptArray(val) {
    return not(val) || Array.isArray(val) && val.length > 0;
}

/**
 * Indicates if given value is either undefined or an instance of HTMLElement
 *
 * @param {any} val
 * @return {boolean}
 */
export function isOptHtml(val) {
    return not(val) || val instanceof HTMLElement;
}
