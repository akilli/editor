import Command from '../base/Command.js';
import Table from './Table.js';
import TagName from '../base/TagName.js';

export default class TableCommand extends Command {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, Table.name, TagName.TABLE);
    }

    /**
     * @param {Object.<string, string>} [attributes = {}]
     * @param {string} attributes.rows
     * @param {string} attributes.cols
     * @return {void}
     */
    insert({ rows, cols } = {}) {
        const figure = this.editor.dom.createElement(TagName.FIGURE, { attributes: { class: Table.name } });
        const table = this.editor.dom.createTable(parseInt(rows, 10) || 1, parseInt(cols, 10) || 1);
        this.editor.dom.insertLastChild(table, figure);
        this.editor.dom.insert(figure);
    }
}
