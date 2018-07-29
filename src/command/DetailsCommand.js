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
        });
        mutation.observe(this.editor.element, {childList: true});
    }

    /**
     * @inheritDoc
     */
    execute() {
        this.editor.execute('inserthtml', '<details><summary>Summary</summary><p>Content</p></details>');
    }
}
