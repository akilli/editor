import Command from '../editor/Command.js';
import Element from '../editor/Element.js';
import LinkDialog from './LinkDialog.js';

/**
 * Link Command
 */
export default class LinkCommand extends Command {
    /**
     * Initializes a new editor link command
     *
     * @param {Editor} editor
     * @param {String} name
     */
    constructor(editor, name) {
        super(editor, name, new Element(editor, 'a'), LinkDialog);
    }

    /**
     * Inserts, updates or removes link element
     *
     * @param {?String} href
     */
    insert({href = null} = {}) {
        const sel = this.editor.getSelectedElement();
        const old = sel instanceof HTMLAnchorElement ? sel : null;

        if (href && old) {
            old.setAttribute('href', href);
        } else if (href) {
            this.element.insert({href: href});
        } else if (old) {
            old.parentElement.replaceChild(this.editor.createText(old.textContent), old);
        }
    }
}
