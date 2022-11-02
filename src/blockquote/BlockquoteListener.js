import Blockquote from './Blockquote.js';
import Listener from '../base/Listener.js';
import TagName from '../base/TagName.js';

export default class BlockquoteListener extends Listener {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('insertblockquote', this);
        this.editor.root.addEventListener('deleteblockquote', this);
    }

    /**
     * @param {CustomEvent} event
     * @param {HTMLQuoteElement} event.detail.element
     * @return {void}
     */
    insertblockquote({ detail: { element } }) {
        this.editor.dom.wrap(element, TagName.FIGURE, { attributes: { class: Blockquote.name } });
    }

    /**
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.target
     * @return {void}
     */
    deleteblockquote({ detail: { target } }) {
        if (target.localName === TagName.FIGURE && target.classList.contains(Blockquote.name)) {
            target.parentElement.removeChild(target);
        }
    }
}
