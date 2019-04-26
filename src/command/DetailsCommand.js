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

        const callback = node => {
            const name = node.nodeName.toLowerCase();

            if (node instanceof HTMLElement && (name === 'summary' || name === 'details' && (node = node.querySelector('summary')))) {
                node.addEventListener('keydown', ev => {
                    if (ev.key === ' ') {
                        ev.preventDefault();
                    }
                });
                node.addEventListener('keyup', ev => {
                    if (ev.key === ' ') {
                        ev.preventDefault();
                        this.editor.insertText(' ');
                    }
                });
            }
        };

        this.editor.element.querySelectorAll('summary').forEach(callback);
        this.editor.register(ev =>  ev.forEach(item => item.addedNodes.forEach(callback)));
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
        summary.innerText = 'Details';
        this.editor.insert(details);
    }
}
