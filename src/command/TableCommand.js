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
        const caption = this.editor.document.createElement('figcaption');
        const table = this.editor.document.createElement('table');

        figure.appendChild(table);
        figure.appendChild(caption);
        caption.innerHTML = 'Caption';

        ['thead', 'tfoot', 'tbody'].forEach(part => {
            const item = this.editor.document.createElement(part);
            const tr = this.editor.document.createElement('tr');
            table.appendChild(item);
            item.appendChild(tr);

            for (let i = 0; i < 2; ++i) {
                let cell = this.editor.document.createElement(item.tagName === 'thead' ? 'th' : 'td');
                tr.appendChild(cell);
            }
        });

        this.editor.insert(figure);
    }
}
