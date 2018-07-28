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

        const mutation = new MutationObserver(ev => {
            ev.forEach(item => {
                item.addedNodes.forEach(node => {
                    let summary;

                    if (node.tagName.toLowerCase() === 'details' && !!(summary = node.querySelector('summary'))) {
                        summary.addEventListener('keyup', e => {
                            if (e.keyCode === 32) {
                                e.preventDefault();
                                this.editor.document.execCommand('inserttext', false, ' ');
                            }
                        });
                    }
                });
            });
        });
        mutation.observe(this.editor.element, {childList: true});
    }

    /**
     * @inheritDoc
     */
    execute() {
        const details = this.editor.document.createElement('details');
        const summary = this.editor.document.createElement('summary');
        const content = this.editor.document.createElement('p');

        details.appendChild(summary);
        details.appendChild(content);
        summary.innerHTML = 'Summary';
        content.innerHTML = 'Content';

        this.editor.document.execCommand('inserthtml', false, details.outerHTML);
    }
}
