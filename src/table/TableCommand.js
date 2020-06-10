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
        super(editor, 'table');
    }

    /**
     * Inserts table element
     *
     * @protected
     * @param {Number} rows
     * @param {Number} cols
     */
    _insert({rows = 1, cols = 1} = {}) {
        rows = rows > 1 ? rows : 1;
        cols = cols > 1 ? cols : 1;

        const figure = this.editor.createElement('figure', {attributes: {class: 'table'}});
        const table = this.editor.createElement('table');
        const tbody = this.editor.createElement('tbody');

        for (let i = 0; i < rows; i++) {
            const tr = this.editor.createElement('tr');
            tbody.appendChild(tr);

            for (let j = 0; j < cols; ++j) {
                tr.appendChild(this.editor.createElement('td'));
            }
        }

        table.appendChild(tbody);
        figure.appendChild(table);
        this.editor.insert(figure);
    }
}
