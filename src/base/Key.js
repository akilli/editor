export default class Key {
    /**
     * @return {string}
     */
    static get A() {
        return 'a';
    }

    /**
     * @return {string}
     */
    static get ARROWDOWN() {
        return 'ArrowDown';
    }

    /**
     * @return {string}
     */
    static get ARROWLEFT() {
        return 'ArrowLeft';
    }

    /**
     * @return {string}
     */
    static get ARROWRIGHT() {
        return 'ArrowRight';
    }

    /**
     * @return {string}
     */
    static get ARROWUP() {
        return 'ArrowUp';
    }

    /**
     * @return {string}
     */
    static get B() {
        return 'b';
    }

    /**
     * @return {string}
     */
    static get BACKSPACE() {
        return 'Backspace';
    }

    /**
     * @return {string}
     */
    static get C() {
        return 'c';
    }

    /**
     * @return {string}
     */
    static get D() {
        return 'd';
    }

    /**
     * @return {string}
     */
    static get DEL() {
        return 'Delete';
    }

    /**
     * @return {string}
     */
    static get E() {
        return 'e';
    }

    /**
     * @return {string}
     */
    static get END() {
        return 'End';
    }

    /**
     * @return {string}
     */
    static get ENTER() {
        return 'Enter';
    }

    /**
     * @return {string}
     */
    static get F() {
        return 'f';
    }

    /**
     * @return {string}
     */
    static get G() {
        return 'g';
    }

    /**
     * @return {string}
     */
    static get HOME() {
        return 'Home';
    }

    /**
     * @return {string}
     */
    static get I() {
        return 'i';
    }

    /**
     * @return {string}
     */
    static get J() {
        return 'j';
    }

    /**
     * @return {string}
     */
    static get K() {
        return 'k';
    }

    /**
     * @return {string}
     */
    static get L() {
        return 'l';
    }

    /**
     * @return {string}
     */
    static get M() {
        return 'm';
    }

    /**
     * @return {string}
     */
    static get O() {
        return 'o';
    }

    /**
     * @return {string}
     */
    static get Q() {
        return 'q';
    }

    /**
     * @return {string}
     */
    static get R() {
        return 'r';
    }

    /**
     * @return {string}
     */
    static get S() {
        return 's';
    }

    /**
     * @return {string}
     */
    static get SPACE() {
        return ' ';
    }

    /**
     * @return {string}
     */
    static get T() {
        return 't';
    }

    /**
     * @return {string}
     */
    static get TAB() {
        return 'Tab';
    }

    /**
     * @return {string}
     */
    static get U() {
        return 'u';
    }

    /**
     * @return {string}
     */
    static get V() {
        return 'v';
    }

    /**
     * @return {string}
     */
    static get W() {
        return 'w';
    }

    /**
     * @return {string}
     */
    static get X() {
        return 'x';
    }

    /**
     * @return {string}
     */
    static get Y() {
        return 'y';
    }

    /**
     * @return {string}
     */
    static get Z() {
        return 'z';
    }

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
    static isEventFor(event, key, { alt = false, ctrl = false, shift = false } = {}) {
        return (
            ((Array.isArray(key) && key.includes(event.key)) || event.key === key) &&
            event.altKey === alt &&
            event.ctrlKey === ctrl &&
            event.shiftKey === shift
        );
    }
}
