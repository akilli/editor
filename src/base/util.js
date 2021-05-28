import { Type } from './enum.js';

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
export function isUndefined(val) {
    return typeof val === Type.UNDEFINED;
}

/**
 * Indicates if given value is a function
 *
 * @param {any} val
 * @return {boolean}
 */
export function isFunction(val) {
    return typeof val === Type.FUNCTION;
}

/**
 * Indicates if given value is a non-empty string
 *
 * @param {any} val
 * @return {boolean}
 */
export function isPopulatedString(val) {
    return val && typeof val === Type.STRING;
}

/**
 * Indicates if given value is either empty or a non-empty string
 *
 * @param {any} val
 * @return {boolean}
 */
export function isEmptyOrString(val) {
    return !val || typeof val === Type.STRING;
}

/**
 * Indicates if given value is either empty or a non-empty array
 *
 * @param {any} val
 * @return {boolean}
 */
export function isEmptyOrArray(val) {
    return !val || Array.isArray(val) && val.length > 0;
}

/**
 * Indicates if given value is either empty or an instance of HTMLElement
 *
 * @param {any} val
 * @return {boolean}
 */
export function isEmptyOrHtml(val) {
    return !val || val instanceof HTMLElement;
}
