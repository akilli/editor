import Filter from '../base/Filter.js';

/**
 * Filters empty tables and table sections
 */
export default class TableFilter extends Filter {
    /**
     * @inheritDoc
     */
    filter(element) {
        if (element instanceof HTMLTableRowElement && !element.querySelector('th:not(:empty), td:not(:empty)')
            || element instanceof HTMLTableSectionElement && element.rows.length <= 0
            || element instanceof HTMLTableElement && element.querySelector('thead, tfoot') && !element.querySelector('tbody')
        ) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        }
    }
}
