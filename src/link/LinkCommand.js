import Command from '../base/Command.js';

/**
 * Link Command
 */
export default class LinkCommand extends Command {
    /**
     * Initializes a new link command
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'link', 'a');
    }

    /**
     * Inserts, updates or removes link element
     *
     * @protected
     * @param {?String} href
     */
    _insert({href = null} = {}) {
        const element = this._selectedElement();

        if (element && href) {
            element.setAttribute('href', this.editor.url(href));
        } else if (element) {
            element.parentElement.replaceChild(this.editor.createText(element.textContent), element);
        } else if (href) {
            this.editor.format(this.editor.createElement('a', {attributes: {href: this.editor.url(href)}}));
        }
    }
}
