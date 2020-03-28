import LinkDialog from '../dialog/LinkDialog.js';
import TextCommand from './TextCommand.js';

/**
 * Link Command
 */
export default class LinkCommand extends TextCommand {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor, 'a', LinkDialog);
    }

    /**
     * Inserts, updates or removes link element
     *
     * @param {String} url
     */
    insert({href = null} = {}) {
        const sel = this.editor.getSelectedElement();
        const old = sel instanceof HTMLAnchorElement ? sel : null;

        if (!!href && !!old) {
            old.setAttribute('href', href);
        } else if (!!href) {
            const a = this.editor.createElement(this.tag.name, {href: href});
            this.editor.formatText(a);
        } else if (!!old) {
            old.parentElement.replaceChild(this.editor.createText(old.textContent), old);
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
