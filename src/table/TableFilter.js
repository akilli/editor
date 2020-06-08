import Filter from '../base/Filter.js';

/**
 * Filters empty tables and table sections
 */
export default class TableFilter extends Filter {
    /**
     * @inheritDoc
     */
    filter(element) {
        if (element instanceof HTMLElement
            && element.matches('figure[class=table')
            && element.querySelector(':scope > table')
            && !element.querySelector(':scope > figcaption')
        ) {
            element.insertAdjacentElement('afterend', element.querySelector(':scope > table'));
            this.removeChildren(element);
        } else if (element instanceof HTMLTableElement
            && element.querySelector(':scope > thead, :scope > tfoot')
            && !element.querySelector(':scope > tbody')
        ) {
            this.removeChildren(element);
        } else if (element instanceof HTMLTableSectionElement && element.rows.length <= 0) {
            this.removeChildren(element);
        } else if (element instanceof HTMLTableRowElement && !element.querySelector(':scope > th:not(:empty), :scope > td:not(:empty)')) {
            this.removeChildren(element);
        }
    }

    /**
     * Removes all children
     *
     * @private
     * @param {HTMLElement} element
     */
    removeChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
}
