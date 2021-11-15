import Command from '../base/Command.js';
import Table from './Table.js';
import TableDom from './TableDom.js';
import { TagName } from '../base/enum.js';

/**
 * Table Command
 */
export default class TableCommand extends Command {
    /**
     * Table DOM manager
     *
     * @type {TableDom}
     */
    #tableDom;

    /**
     * Allows read access to table DOM manager
     *
     * @return {TableDom}
     */
    get tableDom() {
        return this.#tableDom;
    }

    /**
     * Initializes a new table command
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, Table.name, TagName.TABLE);
        this.#tableDom = new TableDom(editor.dom);
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
        figure.appendChild(this.tableDom.createTable(parseInt(rows, 10), parseInt(cols, 10)));
        this.editor.dom.insert(figure);
    }
}
