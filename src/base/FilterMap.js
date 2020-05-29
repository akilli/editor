import Filter from './Filter.js';

/**
 * Filter Map
 *
 * @extends {Map<String, Filter>}
 */
export default class FilterMap extends Map {
    /**
     * Initializes a new filter map
     *
     * @param {Filter[]} [filters = []]
     */
    constructor(filters = []) {
        super();
        filters.forEach(filter => this.set(filter));
    }

    /**
     * Returns registered filter with given name or null
     *
     * @param {String} name
     * @return {?Filter}
     */
    get(name) {
        return super.get(name) || null;
    }

    /**
     * Adds or updates a filter
     *
     * @param {Filter} filter
     */
    set(filter) {
        if (!(filter instanceof Filter)) {
            throw 'Invalid argument';
        }

        super.set(filter.name, filter);
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

        this.forEach(filter => {
            element.normalize();
            filter.filter(element)
        });
    }
}
