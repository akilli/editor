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
        this.editor.register(ev => {
            ev.forEach(item => {
                item.addedNodes.forEach(node => {
                    let summary;

                    if (node instanceof HTMLDetailsElement && !!(summary = node.querySelector('summary'))) {
                        summary.addEventListener('keyup', e => {
                            if (e.keyCode === 32) {
                                e.preventDefault();
                                this.editor.execute('inserttext', ' ');
                            }
                        });
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
        summary.innerHTML = 'Summary';
        p.innerHTML = 'Content';

        this.editor.execute('inserthtml', details.outerHTML);
    }
}
