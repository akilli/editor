import Command from './Command.js';

/**
 * Details Command
 */
export default class DetailsCommand extends Command {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);

        const keyDown = ev => {
            if (ev.key === ' ') {
                ev.preventDefault();
            }
        };
        const keyUp = ev => {
            if (ev.key === ' ') {
                ev.preventDefault();
                this.editor.execute('inserttext', ' ');
            }
        };
        this.editor.element.querySelectorAll('summary').forEach(summary => {
            summary.addEventListener('keydown', keyDown);
            summary.addEventListener('keyup', keyUp)
        });
        this.editor.register(ev =>  {
            ev.forEach(item => {
                item.addedNodes.forEach(node => {
                    let summary;

                    if (node instanceof HTMLDetailsElement && !!(summary = node.querySelector('summary'))) {
                        summary.addEventListener('keydown', keyDown);
                        summary.addEventListener('keyup', keyUp);
                    }
                });
            });
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
        this.editor.insert(details);
    }
}
