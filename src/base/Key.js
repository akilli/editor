/**
 * @enum {string}
 */
export default Object.freeze({
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
    return (
        ((Array.isArray(key) && key.includes(event.key)) || event.key === key) &&
        event.altKey === alt &&
        event.ctrlKey === ctrl &&
        event.shiftKey === shift
    );
}
