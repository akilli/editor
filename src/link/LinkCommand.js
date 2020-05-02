import Command from '../base/Command.js';

/**
 * Link Command
 */
export default class LinkCommand extends Command {
    /**
     * Inserts, updates or removes link element
     *
     * @param {?String} href
     */
    insert({href = null} = {}) {
        const sel = this.editor.getSelectedElement();
        const old = sel instanceof HTMLAnchorElement ? sel : null;

        if (href && old) {
            old.setAttribute('href', this.editor.url(href));
        } else if (href) {
            this.editor.format(this.editor.createElement('a', {attributes: {href: this.editor.url(href)}}));
        } else if (old) {
            old.parentElement.replaceChild(this.editor.createText(old.textContent), old);
        }
    }
}
