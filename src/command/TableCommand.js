import Command from './Command.js';

/**
 * Table Command
 */
export default class TableCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        const figure = this.editor.document.createElement('figure');
        const table = this.editor.document.createElement('table');
        const figcaption = this.editor.document.createElement('figcaption');

        figure.classList.add('table');
        figure.appendChild(table);
        figure.appendChild(figcaption);

        ['thead', 'tbody', 'tfoot'].forEach(section => {
            const item = this.editor.document.createElement(section);
            const tr = this.editor.document.createElement('tr');
            table.appendChild(item);
            item.appendChild(tr);

            for (let i = 0; i < 2; ++i) {
                let cell = this.editor.document.createElement(section === 'thead' ? 'th' : 'td');
                tr.appendChild(cell);
            }
        });

        this.editor.insert(figure);
    }
}
