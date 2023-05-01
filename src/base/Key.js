import Alignment from './Alignment.js';
import Sorting from './Sorting.js';

/**
 * @enum {string}
 */
export const Key = Object.freeze({
    A: 'a',
    ARROWDOWN: 'ArrowDown',
    ARROWLEFT: 'ArrowLeft',
    ARROWRIGHT: 'ArrowRight',
    ARROWUP: 'ArrowUp',
    B: 'b',
    BACKSPACE: 'Backspace',
    C: 'c',
    D: 'd',
    DEL: 'Delete',
    E: 'e',
    END: 'End',
    ENTER: 'Enter',
    F: 'f',
    G: 'g',
    HOME: 'Home',
    I: 'i',
    J: 'j',
    K: 'k',
    L: 'l',
    M: 'm',
    O: 'o',
    Q: 'q',
    R: 'r',
    S: 's',
    SPACE: ' ',
    T: 't',
    TAB: 'Tab',
    U: 'u',
    V: 'v',
    W: 'w',
    X: 'x',
    Y: 'y',
    Z: 'z',
});

/**
 * @type {string[]}
 */
export const ArrowKeys = Object.freeze([Key.ARROWLEFT, Key.ARROWRIGHT, Key.ARROWUP, Key.ARROWDOWN]);

/**
 * @type {string[]}
 */
export const NavKeys = Object.freeze([Key.HOME, Key.ARROWUP, Key.ARROWDOWN, Key.END]);

/**
 * @type {string[]}
 */
export const BarNavKeys = Object.freeze([Key.HOME, Key.ARROWLEFT, Key.ARROWRIGHT, Key.END]);

/**
 * @type {Object<Key, Alignment>}
 */
export const AlignKeyMap = Object.freeze({
    [Key.ARROWUP]: Alignment.NONE,
    [Key.ARROWLEFT]: Alignment.LEFT,
    [Key.ARROWDOWN]: Alignment.CENTER,
    [Key.ARROWRIGHT]: Alignment.RIGHT,
});

/**
 * @type {Object<Key, Sorting>}
 */
export const SortKeyMap = Object.freeze({
    [Key.HOME]: Sorting.FIRST,
    [Key.ARROWUP]: Sorting.PREV,
    [Key.ARROWDOWN]: Sorting.NEXT,
    [Key.END]: Sorting.LAST,
});

/**
 * Indicates if keyboard event was triggered for given key combination
 *
 * @param {KeyboardEvent} event
 * @param {string} key
 * @param {boolean} alt
 * @param {boolean} ctrl
 * @param {boolean} shift
 * @return {boolean}
 */
export function isKey(event, key, { alt = false, ctrl = false, shift = false } = {}) {
    return event.key === key && event.altKey === alt && event.ctrlKey === ctrl && event.shiftKey === shift;
}

/**
 * Indicates if keyboard event was triggered for any of the given key combinations
 *
 * @param {KeyboardEvent} event
 * @param {string[]} key
 * @param {boolean} alt
 * @param {boolean} ctrl
 * @param {boolean} shift
 * @return {boolean}
 */
export function isAnyKey(event, key, { alt = false, ctrl = false, shift = false } = {}) {
    return (
        Array.isArray(key) &&
        key.includes(event.key) &&
        event.altKey === alt &&
        event.ctrlKey === ctrl &&
        event.shiftKey === shift
    );
}

/**
 * Indicates if keyboard event was triggered for given arrow key combination
 *
 * @param {KeyboardEvent} event
 * @return {boolean}
 */
export function isArrowKey(event) {
    return isAnyKey(event, ArrowKeys);
}

/**
 * Indicates if keyboard event was triggered for given navigation key combination
 *
 * @param {KeyboardEvent} event
 * @return {boolean}
 */
export function isNavKey(event) {
    return isAnyKey(event, NavKeys);
}

/**
 * Indicates if keyboard event was triggered for given bar navigation key combination
 *
 * @param {KeyboardEvent} event
 * @return {boolean}
 */
export function isBarNavKey(event) {
    return isAnyKey(event, BarNavKeys);
}

/**
 * Indicates if keyboard event was triggered for given aligment key combination
 *
 * @param {KeyboardEvent} event
 * @return {boolean}
 */
export function isAlignKey(event) {
    return isAnyKey(event, Object.keys(AlignKeyMap), { shift: true });
}

/**
 * Indicates if keyboard event was triggered for given sorting key combination
 *
 * @param {KeyboardEvent} event
 * @return {boolean}
 */
export function isSortKey(event) {
    return isAnyKey(event, Object.keys(SortKeyMap), { ctrl: true });
}

/**
 * Indicates if keyboard event was triggered for given format key combination
 *
 * @param {KeyboardEvent} event
 * @return {boolean}
 */
export function isFormatKey(event) {
    return /^[A-Z]$/.test(event.key) && isKey(event, event.key, { alt: true, shift: true });
}
