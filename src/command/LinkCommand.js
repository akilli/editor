import EditableCommand from './EditableCommand.js';
import LinkDialog from '../dialog/LinkDialog.js';

/**
 * Link Command
 */
export default class LinkCommand extends EditableCommand {
    /**
     * @inheritDoc
     */
    constructor(editor, tagName = 'a') {
        super(editor, tagName, LinkDialog);
    }

    /**
     * @inheritDoc
     *
     * @param {String} href
     */
    insert({href = null} = {}) {
        const sel = this.editor.getSelectedElement();
        const old = sel instanceof HTMLAnchorElement ? sel : null;

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

    /**
     * @inheritDoc
     */
    oldData() {
        const sel = this.editor.getSelectedElement();

        return sel instanceof HTMLAnchorElement ? {href: sel.getAttribute('href')} : {};
    }
}
