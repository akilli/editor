export default class Sorting {
    /**
     * @return {string}
     */
    static get FIRST() {
        return 'first';
    }

    /**
     * @return {string}
     */
    static get PREV() {
        return 'prev';
    }

    /**
     * @return {string}
     */
    static get NEXT() {
        return 'next';
    }

    /**
     * @return {string}
     */
    static get LAST() {
        return 'last';
    }

    /**
     * @return {string[]}
     */
    static values() {
        return [this.FIRST, this.PREV, this.NEXT, this.LAST];
    }
}
