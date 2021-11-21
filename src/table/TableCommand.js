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
     * @param {string} rows
     * @param {string} cols
     * @return {void}
     */
    insert({ rows, cols } = {}) {
        const figure = this.editor.dom.createElement(TagName.FIGURE, { attributes: { class: Table.name } });
        const table = this.editor.dom.createElement(TagName.TABLE);
        const tbody = this.editor.dom.createElement(TagName.TBODY);
        const r = parseInt(rows, 10) || 1;
        const c = parseInt(cols, 10) || 1;

        for (let i = 0; i < r; i++) {
            const tr = this.editor.dom.createElement(TagName.TR);
            tbody.appendChild(tr);

            for (let j = 0; j < c; ++j) {
                tr.appendChild(this.editor.dom.createElement(TagName.TD));
            }
        }

        table.appendChild(tbody);
        figure.appendChild(table);
        this.editor.dom.insert(figure);
    }
}
