import Filter from './Filter.js';

/**
 * Filter Manager
 */
export default class FilterManager {
    /**
     * Registered filters
     *
     * @type {Set<Filter>}
     */
    #items = new Set();

    /**
     * Adds or updates a filter
     *
     * @param {Filter} filter
     * @return {void}
     */
    add(filter) {
        if (!(filter instanceof Filter)) {
            throw 'Invalid argument';
        }

        this.#items.add(filter);
    }

    /**
     * Filters element
     *
     * @param {HTMLElement} element
     * @return {void}
     */
    filter(element) {
        if (!(element instanceof HTMLElement)) {
            throw 'Invalid argument';
        }

        this.#items.forEach(filter => {
            element.normalize();
            filter.filter(element)
        });
    }
}
