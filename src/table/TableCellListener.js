import Key from '../base/Key.js';
import Listener from '../base/Listener.js';
import { isKey } from '../base/util.js';

/**
 * Tablecell Listener
 */
export default class TableCellListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('inserttd', this);
        this.editor.root.addEventListener('insertth', this);
    }

    /**
     * Initializes table cell elements
     *
     * @param {HTMLTableCellElement} element
     * @return {void}
     */
    inserttd({ detail: { element } }) {
        element.addEventListener('keydown', this);
    }

    /**
     * Initializes table cell elements
     *
     * @param {HTMLTableHeaderCellElement} element
     * @return {void}
     */
    insertth({ detail: { element } }) {
        element.addEventListener('keydown', this);
    }

    /**
     * Handles key combinations for navigating, sorting, adding and deleting
     *
     * @param {KeyboardEvent} event
     * @param {HTMLTableCellElement} event.target
     * @return {void}
     */
    keydown(event) {
        const cell = event.target;
        const row = cell.parentElement;
        const base = row.parentElement;
        const table = base instanceof HTMLTableElement ? base : base.parentElement;
        const keys = [Key.LEFT, Key.RIGHT, Key.UP, Key.DOWN];
        const isNav = isKey(event, keys);
        const isSort = isKey(event, keys, { ctrl: true });
        const isAdd = isKey(event, keys, { alt: true });
        const isDel = isKey(event, keys, { alt: true, shift: true });

        if (cell instanceof HTMLTableCellElement
            && row instanceof HTMLTableRowElement
            && (base instanceof HTMLTableElement || base instanceof HTMLTableSectionElement)
            && table instanceof HTMLTableElement
            && (isNav && this.#enabled(cell, event.key) || isSort || isAdd || isDel)
        ) {
            const cellIndex = cell.cellIndex;
            const cellLength = row.cells.length;
            const rowLength = base.rows.length;
            const rowIndex = base instanceof HTMLTableElement ? row.rowIndex : row.sectionRowIndex;
            const isFirst = cellIndex === 0;
            const isLast = cellIndex === cellLength - 1;
            const isFirstRow = rowIndex === 0;
            const isLastRow = rowIndex === rowLength - 1;
            const isFirstTableRow = row.rowIndex === 0;
            const isLastTableRow = row.rowIndex === table.rows.length - 1;

            event.preventDefault();
            event.stopPropagation();

            if (isNav) {
                if (event.key === Key.LEFT && !isFirst) {
                    this.editor.dom.focusEnd(row.cells[cellIndex - 1]);
                } else if (event.key === Key.LEFT && isFirstTableRow) {
                    this.editor.dom.focusEnd(table.rows[table.rows.length - 1].cells[cellLength - 1]);
                } else if (event.key === Key.LEFT) {
                    this.editor.dom.focusEnd(table.rows[row.rowIndex - 1].cells[cellLength - 1]);
                } else if (event.key === Key.RIGHT && !isLast) {
                    row.cells[cellIndex + 1].focus();
                } else if (event.key === Key.RIGHT && isLastTableRow) {
                    table.rows[0].cells[0].focus();
                } else if (event.key === Key.RIGHT) {
                    table.rows[row.rowIndex + 1].cells[0].focus();
                } else if (event.key === Key.UP && isFirstTableRow) {
                    table.rows[table.rows.length - 1].cells[cellIndex].focus();
                } else if (event.key === Key.UP) {
                    table.rows[row.rowIndex - 1].cells[cellIndex].focus();
                } else if (event.key === Key.DOWN && isLastTableRow) {
                    table.rows[0].cells[cellIndex].focus();
                } else if (event.key === Key.DOWN) {
                    table.rows[row.rowIndex + 1].cells[cellIndex].focus();
                }
            } else if (isSort) {
                if (event.key === Key.LEFT && cellLength > 1 && isFirst) {
                    Array.from(table.rows).forEach(item =>
                        this.editor.dom.insertLastChild(item.cells[cellIndex], item),
                    );
                } else if (event.key === Key.LEFT && cellLength > 1) {
                    Array.from(table.rows).forEach(item =>
                        this.editor.dom.insertBefore(item.cells[cellIndex], item.cells[cellIndex - 1]),
                    );
                } else if (event.key === Key.RIGHT && cellLength > 1 && isLast) {
                    Array.from(table.rows).forEach(item =>
                        this.editor.dom.insertFirstChild(item.cells[cellIndex], item),
                    );
                } else if (event.key === Key.RIGHT && cellLength > 1) {
                    Array.from(table.rows).forEach(item =>
                        this.editor.dom.insertAfter(item.cells[cellIndex], item.cells[cellIndex + 1]),
                    );
                } else if (event.key === Key.UP && rowLength > 1 && isFirstRow) {
                    this.editor.dom.insertLastChild(row, base);
                } else if (event.key === Key.UP && rowLength > 1) {
                    this.editor.dom.insertBefore(row, base.rows[rowIndex - 1]);
                } else if (event.key === Key.DOWN && rowLength > 1 && isLastRow) {
                    this.editor.dom.insertFirstChild(row, base);
                } else if (event.key === Key.DOWN && rowLength > 1) {
                    this.editor.dom.insertAfter(row, base.rows[rowIndex + 1]);
                }

                cell.focus();
            } else if (isAdd) {
                if (event.key === Key.LEFT) {
                    Array.from(table.rows).forEach(item => {
                        const c = item.cells[cellIndex];
                        this.editor.dom.insertBefore(this.editor.dom.createElement(c.localName), c);
                    });
                } else if (event.key === Key.RIGHT) {
                    Array.from(table.rows).forEach(item => {
                        const c = item.cells[cellIndex];
                        this.editor.dom.insertAfter(this.editor.dom.createElement(c.localName), c);
                    });
                } else if (event.key === Key.UP) {
                    this.editor.dom.insertBefore(this.editor.dom.createTableRow(cellLength), row);
                } else if (event.key === Key.DOWN) {
                    this.editor.dom.insertAfter(this.editor.dom.createTableRow(cellLength), row);
                }
            } else if (isDel) {
                if (event.key === Key.LEFT && !isFirst) {
                    Array.from(table.rows).forEach(item => item.deleteCell(cellIndex - 1));
                } else if (event.key === Key.RIGHT && !isLast) {
                    Array.from(table.rows).forEach(item => item.deleteCell(cellIndex + 1));
                } else if (event.key === Key.UP && rowIndex > 0) {
                    base.deleteRow(rowIndex - 1);
                } else if (event.key === Key.DOWN && rowIndex < rowLength - 1) {
                    base.deleteRow(rowIndex + 1);
                }
            }
        }
    }

    /**
     * Enables or disables navigation for table cell elements
     *
     * @param {HTMLTableCellElement} element
     * @param {string} key
     * @return {boolean}
     */
    #enabled(element, key) {
        if ([Key.UP, Key.DOWN].includes(key)) {
            return true;
        }

        const sel = this.editor.dom.getSelection();
        const anc = sel.anchorNode instanceof HTMLElement ? sel.anchorNode : element;

        if (!sel.isCollapsed) {
            return false;
        }

        if (key === Key.LEFT) {
            let first = element.firstChild;

            if (first instanceof HTMLElement) {
                first = first.firstChild;
            }

            return sel.anchorOffset === 0 && [element, first].includes(anc);
        }

        let last = element.lastChild;

        if (element.lastChild instanceof HTMLBRElement && element.lastChild.previousSibling) {
            last = element.lastChild.previousSibling;
        }

        if (last instanceof HTMLElement) {
            last = last.lastChild;
        }

        return sel.anchorOffset === anc.textContent.length && [element, last].includes(anc);
    }
}
