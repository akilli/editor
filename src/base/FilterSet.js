import Filter from './Filter.js';

/**
 * Filter Set
 *
 * @extends {Set<Filter>}
 */
export default class FilterSet extends Set {
    /**
     * Adds or updates a filter
     *
     * @param {Filter} filter
     */
    add(filter) {
        if (!(filter instanceof Filter)) {
            throw 'Invalid argument';
        }

        super.add(filter);
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
