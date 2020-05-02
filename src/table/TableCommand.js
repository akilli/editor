import Command from '../base/Command.js';

/**
 * Table Command
 */
export default class TableCommand extends Command {
    /**
     * Inserts table element
     *
     * @param {Number} rows
     * @param {Number} cols
     */
    insert({rows = 1, cols = 1} = {}) {
        if (rows <= 0 || cols <= 0) {
            throw 'Invalid argument';
        }

        const table = this.editor.createElement('table');
        ['thead', 'tbody', 'tfoot'].forEach(section => {
            const item = this.editor.createElement(section);
            const cell = section === 'thead' ? 'th' : 'td';
            const r = section === 'tbody' ? rows : 1;
            let tr;

            table.appendChild(item);

            for (let i = 0; i < r; i++) {
                tr = this.editor.createElement('tr');
                item.appendChild(tr);

                for (let j = 0; j < cols; ++j) {
                    tr.appendChild(this.editor.createElement(cell));
                }
            }
        });

        const figure = this.editor.createElement('figure', {attributes: {class: 'table'}});
        figure.appendChild(table);
        figure.appendChild(this.editor.createElement('figcaption'));

        this.editor.insert(figure);
    }
}
