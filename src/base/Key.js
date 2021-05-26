/**
 * Keys
 */
export default Object.freeze({
    BACKSPACE: 'Backspace',
    DEL: 'Delete',
    DOWN: 'ArrowDown',
    END: 'End',
    ENTER: 'Enter',
    ESC: 'Escape',
    HOME: 'Home',
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    SPACE: ' ',
    UP: 'ArrowUp',

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
    is(event, key, {alt = false, ctrl = false, shift = false} = {}) {
        return (Array.isArray(key) && key.includes(event.key) || event.key === key)
            && event.altKey === alt
            && event.ctrlKey === ctrl
            && event.shiftKey === shift;
    },
});
