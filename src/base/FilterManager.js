import Filter from './Filter.js';

/**
 * Filter Manager
 */
export default class FilterManager {
    /**
     * Registered filters
     *
     * @private
     * @type {Set<Filter>}
     */
    __items = new Set();

    /**
     * Adds or updates a filter
     *
     * @param {Filter} filter
     */
    add(filter) {
        if (!(filter instanceof Filter)) {
            throw 'Invalid argument';
        }

        this.__items.add(filter);
    }

    /**
     * Filters element
     *
     * @param {HTMLElement} element
     */
    filter(element) {
        if (!(element instanceof HTMLElement)) {
            throw 'Invalid argument';
        }

        this.__items.forEach(filter => {
            element.normalize();
            filter.filter(element)
        });
    }
}
