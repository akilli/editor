import Filter from '../base/Filter.js';
import Table from './Table.js';
import { Position, TagName } from '../base/enum.js';

/**
 * Filters table figure, element, sections and rows
 */
export default class TableFilter extends Filter {
    /**
     * @inheritDoc
     */
    filter(element) {
        if (element instanceof HTMLElement
            && element.localName === TagName.FIGURE
            && element.classList.contains(Table.name)
            && element.querySelector(':scope > ' + TagName.TABLE)
            && !element.querySelector(':scope > ' + TagName.FIGCAPTION)
        ) {
            element.insertAdjacentElement(Position.BEFOREBEGIN, element.querySelector(':scope > ' + TagName.TABLE));
            element.innerHTML = '';
        } else if (element instanceof HTMLTableElement
            && element.querySelector(`:scope > ${TagName.THEAD}, :scope > ${TagName.TFOOT}`)
            && !element.querySelector(':scope > ' + TagName.TBODY)
        ) {
            element.innerHTML = '';
        } else if (element instanceof HTMLTableSectionElement && element.rows.length <= 0) {
            element.innerHTML = '';
        } else if (element instanceof HTMLTableRowElement
            && !element.querySelector(`:scope > ${TagName.TH}:not(:empty), :scope > ${TagName.TD}:not(:empty)`)
        ) {
            element.innerHTML = '';
        }
    }
}
