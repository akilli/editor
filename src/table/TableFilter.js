import Filter from '../editor/Filter.js';

/**
 * Filters empty tables and table sections
 */
export default class TableFilter extends Filter {
    /**
     * @inheritDoc
     */
    filter(parent, forceRoot = false) {
        if (parent instanceof HTMLTableRowElement && !parent.querySelector('th:not(:empty), td:not(:empty)')
            || parent instanceof HTMLTableElement && parent.querySelector('thead, tfoot') && !parent.querySelector('tbody')
        ) {
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }
    }
}
