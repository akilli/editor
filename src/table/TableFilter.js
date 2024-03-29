import Filter from '../base/Filter.js';
import Table from './Table.js';
import TagName from '../base/TagName.js';

export default class TableFilter extends Filter {
    /**
     * @param {HTMLElement} element
     * @return {void}
     */
    filter(element) {
        if (
            element instanceof HTMLElement &&
            element.localName === TagName.FIGURE &&
            element.classList.contains(Table.name) &&
            element.querySelector(':scope > ' + TagName.TABLE) &&
            !element.querySelector(':scope > ' + TagName.FIGCAPTION)
        ) {
            this.editor.dom.insertBefore(element.querySelector(':scope > ' + TagName.TABLE), element);
            element.parentElement.removeChild(element);
        } else if (
            element instanceof HTMLTableElement &&
            element.querySelector(`:scope > ${TagName.THEAD}, :scope > ${TagName.TFOOT}`) &&
            !element.querySelector(':scope > ' + TagName.TBODY)
        ) {
            element.parentElement.removeChild(element);
        } else if (element instanceof HTMLTableSectionElement && element.rows.length <= 0) {
            element.parentElement.removeChild(element);
        } else if (
            element instanceof HTMLTableRowElement &&
            !element.querySelector(`:scope > ${TagName.TH}:not(:empty), :scope > ${TagName.TD}:not(:empty)`)
        ) {
            element.parentElement.removeChild(element);
        }
    }
}
