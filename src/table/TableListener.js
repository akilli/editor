import Listener from '../base/Listener.js';
import Table from './Table.js';
import { TagName } from '../base/enum.js';

/**
 * Table Listener
 */
export default class TableListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('inserttable', this);
    }

    /**
     * Initializes table elements
     *
     * @param {CustomEvent} event
     * @param {HTMLTableElement} event.detail.element
     * @return {void}
     */
    inserttable(event) {
        this.editor.dom.wrap(event.detail.element, TagName.FIGURE, { attributes: { class: Table.name } });

        if (event.detail.element.tBodies.length > 0 && event.detail.element.tBodies[0].rows[0]) {
            const tbody = event.detail.element.tBodies[0];
            const cols = tbody.rows[0].cells.length;

            if (!event.detail.element.tHead) {
                this.editor.dom.insertBefore(this.editor.dom.createTableHeader(1, cols), tbody);
            }

            if (!event.detail.element.tFoot) {
                this.editor.dom.insertLastChild(this.editor.dom.createTableFooter(1, cols), event.detail.element);
            }
        }
    }
}
