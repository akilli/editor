import TextCommand from './TextCommand.js';

/**
 * Link Command
 */
export default class LinkCommand extends TextCommand {
    /**
     * @inheritDoc
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
        const href = this.editor.window.prompt('URL', old ? old.getAttribute('href') : '');

        if (!!href && !!old) {
            old.setAttribute('href', href);
        } else if (!!href) {
            const a = this.editor.document.createElement(this.tag.name);
            a.setAttribute('href', href);
            this.editor.formatText(a);
        } else if (!!old) {
            old.parentElement.replaceChild(this.editor.document.createTextNode(old.innerText), old);
        }
    }
}
