import Listener from '../base/Listener.js';
import Table from './Table.js';
import TagName from '../base/TagName.js';

export default class TableListener extends Listener {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('inserttable', this);
    }

    /**
     * @param {CustomEvent} event
     * @param {HTMLTableElement} event.detail.element
     * @return {void}
     */
    inserttable({ detail: { element } }) {
        this.editor.dom.wrap(element, TagName.FIGURE, { attributes: { class: Table.name } });

        if (element.tBodies.length > 0 && element.tBodies[0].rows[0]) {
            const tbody = element.tBodies[0];
            const cols = tbody.rows[0].cells.length;

            if (!element.tHead) {
                this.editor.dom.insertBefore(this.editor.dom.createTableHeader(1, cols), tbody);
            }

            if (!element.tFoot) {
                this.editor.dom.insertLastChild(this.editor.dom.createTableFooter(1, cols), element);
            }
        }
    }
}
