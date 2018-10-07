import TextCommand from './TextCommand.js';

/**
 * Link Command
 */
export default class LinkCommand extends TextCommand {
    /**
     * Initializes a new editor command
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'a');
    }

    /**
     * @inheritDoc
     */
    execute() {
        const sel = this.editor.getSelectedElement();
        const old = sel instanceof HTMLAnchorElement ? sel : null;
        let href = old ? old.getAttribute('href') : '';

        if (href = this.editor.window.prompt('URL', href)) {
            if (old) {
                old.setAttribute('href', href);
            } else {
                const a = this.editor.document.createElement(this.tag.name);
                a.setAttribute('href', href);
                this.editor.formatText(a);
            }
        }
    }
}
