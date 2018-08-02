import Command from './Command.js';

/**
 * Details Command
 */
export default class DetailsCommand extends Command {
    /**
     * @inheritDoc
     */
    constructor(editor, name) {
        super(editor, name);
        this.editor.element.querySelectorAll('summary').forEach(summary => {
            summary.addEventListener('keyup', this.onKeyup.bind(this));
        });
    }

    /**
     * @inheritDoc
     */
    execute() {
        const details = this.editor.document.createElement('details');
        const summary = this.editor.document.createElement('summary');
        const p = this.editor.document.createElement('p');

        details.appendChild(summary);
        details.appendChild(p);
        summary.addEventListener('keyup', this.onKeyup.bind(this));
        summary.innerText = 'Summary';
        p.innerText = 'Content';

        this.editor.insert(details);
    }

    /**
     * Keyboard event listener
     *
     * @param {KeyboardEvent} ev
     */
    onKeyup(ev) {
        if (ev instanceof KeyboardEvent && ev.key === ' ') {
            ev.preventDefault();
            this.editor.execute('inserttext', ' ');
        }
    }
}
