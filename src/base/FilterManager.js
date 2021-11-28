import Filter from './Filter.js';
import { ErrorMessage } from './enum.js';

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
            throw ErrorMessage.INVALID_ARGUMENT;
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
            throw ErrorMessage.INVALID_ARGUMENT;
        }

        this.#items.forEach(filter => {
            element.normalize();
            filter.filter(element);
        });
    }

    /**
     * Freezes itself and its items
     */
    freeze() {
        this.#items.forEach(filter => Object.freeze(filter));
        Object.freeze(this.#items);
        Object.freeze(this);
    }
}
