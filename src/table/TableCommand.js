import Command from '../base/Command.js';

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
        super(editor, 'table', 'table');
    }

    /**
     * Inserts table element
     *
     * @protected
     * @param {number} rows
     * @param {number} cols
     * @return {void}
     */
    _insert({rows = 1, cols = 1} = {}) {
        const figure = this.editor.dom.createElement('figure', {attributes: {class: 'table'}});
        const table = this.editor.dom.createElement('table');
        const tbody = this.editor.dom.createElement('tbody');

        for (let i = 0; i < rows; i++) {
            const tr = this.editor.dom.createElement('tr');
            tbody.appendChild(tr);

            for (let j = 0; j < cols; ++j) {
                tr.appendChild(this.editor.dom.createElement('td'));
            }
        }

        table.appendChild(tbody);
        figure.appendChild(table);
        this.editor.dom.insert(figure);
    }
}
