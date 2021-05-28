import Command from '../base/Command.js';
import Table from './Table.js';
import { TagName } from '../base/enum.js';

/**
 * Table Command
 */
export default class TableCommand extends Command {
    /**
     * Initializes a new table command
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, Table.name, TagName.TABLE);
    }

    /**
     * Inserts table element
     *
     * @protected
     * @param {number} [rows = 1]
     * @param {number} [cols = 1]
     * @return {void}
     */
    _insert({ rows = 1, cols = 1 } = {}) {
        const figure = this.editor.dom.createElement(TagName.FIGURE, { attributes: { class: Table.name } });
        const table = this.editor.dom.createElement(TagName.TABLE);
        const tbody = this.editor.dom.createElement(TagName.TBODY);

        for (let i = 0; i < rows; i++) {
            const tr = this.editor.dom.createElement(TagName.TR);
            tbody.appendChild(tr);

            for (let j = 0; j < cols; ++j) {
                tr.appendChild(this.editor.dom.createElement(TagName.TD));
            }
        }

        table.appendChild(tbody);
        figure.appendChild(table);
        this.editor.dom.insert(figure);
    }
}
