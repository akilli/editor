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

        const callback = ev => {
            if (ev instanceof KeyboardEvent && ev.key === ' ') {
                ev.preventDefault();
                this.editor.execute('inserttext', ' ');
            }
        };
        this.editor.element.querySelectorAll('summary').forEach(summary => {
            summary.addEventListener('keyup', callback);
        });
        this.editor.register(ev => {
            ev.forEach(item => {
                item.addedNodes.forEach(node => {
                    let summary;

                    if (node instanceof HTMLDetailsElement && !!(summary = node.querySelector('summary'))) {
                        summary.addEventListener('keyup', callback);
                    }
                });
            });
        }, {childList: true});
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
        summary.innerText = 'Summary';
        p.innerText = 'Content';

        this.editor.insert(details);
    }
}
