import Command from './Command.js';

/**
 * Table Command
 */
export default class TableCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        const table = this.editor.document.createElement('table');

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

        this.editor.document.execCommand('inserthtml', false, table.outerHTML);
    }
}
