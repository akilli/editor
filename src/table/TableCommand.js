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
        this.editor.dom.insert(this.editor.dom.createTable(parseInt(rows, 10) || 1, parseInt(cols, 10) || 1));
    }
}
