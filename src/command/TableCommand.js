import Command from './Command.js';
import TableDialog from '../dialog/TableDialog.js';

/**
 * Table Command
 */
export default class TableCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        const dialog = new TableDialog(this.editor, this.insert);
        dialog.open();
    }

    /**
     * Inserts table
     *
     * @param {Number} rows
     * @param {Number} cols
     */
    insert({rows = 1, cols = 1} = {}) {
        if (rows <= 0 || cols <= 0) {
            return;
        }

        const figure = this.editor.document.createElement('figure');
        const table = this.editor.document.createElement('table');
        const figcaption = this.editor.document.createElement('figcaption');

        figure.classList.add('table');
        figure.appendChild(table);
        figure.appendChild(figcaption);

        ['thead', 'tbody', 'tfoot'].forEach(section => {
            const item = this.editor.document.createElement(section);
            const cell = section === 'thead' ? 'th' : 'td';
            const r = section === 'tbody' ? rows : 1;
            let tr;

            table.appendChild(item);

            for (let i = 0; i < r; i++) {
                tr = this.editor.document.createElement('tr');
                item.appendChild(tr);

                for (let j = 0; j < cols; ++j) {
                    tr.appendChild(this.editor.document.createElement(cell));
                }
            }
        });

        this.editor.insert(figure);
    }
}
