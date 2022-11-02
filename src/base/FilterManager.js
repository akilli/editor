import Filter from './Filter.js';

export default class FilterManager {
    /**
     * @type {Set<Filter>}
     */
    #items = new Set();

    /**
     * @param {Filter} filter
     * @return {void}
     */
    add(filter) {
        if (!(filter instanceof Filter)) {
            throw new TypeError('Invalid argument');
        }

        this.#items.add(filter);
    }

    /**
     * @param {HTMLElement} element
     * @return {void}
     */
    filter(element) {
        if (!(element instanceof HTMLElement)) {
            throw new TypeError('Invalid argument');
        }

        this.#items.forEach((filter) => {
            element.normalize();
            filter.filter(element);
        });
    }

    /**
     * @return {void}
     */
    freeze() {
        this.#items.forEach((filter) => Object.freeze(filter));
        Object.freeze(this.#items);
        Object.freeze(this);
    }
}
