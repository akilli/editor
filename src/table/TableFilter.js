import Filter from '../base/Filter.js';

/**
 * Filters table figure, element, sections and rows
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
            element.innerHTML = '';
        } else if (element instanceof HTMLTableElement
            && element.querySelector(':scope > thead, :scope > tfoot')
            && !element.querySelector(':scope > tbody')
        ) {
            element.innerHTML = '';
        } else if (element instanceof HTMLTableSectionElement && element.rows.length <= 0) {
            element.innerHTML = '';
        } else if (element instanceof HTMLTableRowElement && !element.querySelector(':scope > th:not(:empty), :scope > td:not(:empty)')) {
            element.innerHTML = '';
        }
    }
}
