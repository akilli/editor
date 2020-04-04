import Command from '../editor/Command.js';
import LinkDialog from './LinkDialog.js';

/**
 * Link Command
 */
export default class LinkCommand extends Command {
    /**
     * Initializes a new editor link command
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'a', LinkDialog);
    }

    /**
     * Inserts, updates or removes link element
     *
     * @param {?String} href
     */
    insert({href = null} = {}) {
        const sel = this.editor.getSelectedElement();
        const old = sel instanceof HTMLAnchorElement ? sel : null;

        if (!!href && !!old) {
            old.setAttribute('href', href);
        } else if (!!href) {
            this.editor.insert(this.editor.createElement(this.tag.name, {href: href}));
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
