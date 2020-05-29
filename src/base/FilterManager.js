import Filter from './Filter.js';

/**
 * Filter Manager
 */
export default class FilterManager {
    /**
     * Registered tags
     *
     * @private
     * @type {Map<String, Filter>}
     */
    map = new Map();

    /**
     * Adds or updates a filter
     *
     * @param {Filter} filter
     */
    set(filter) {
        if (!(filter instanceof Filter)) {
            throw 'Invalid argument';
        }

        this.map.set(filter.name, filter);
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

        this.map.forEach(filter => {
            element.normalize();
            filter.filter(element)
        });
    }
}
