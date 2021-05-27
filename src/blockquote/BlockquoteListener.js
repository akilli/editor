import Blockquote from './Blockquote.js';
import Listener from '../base/Listener.js';
import { TagName } from '../base/enum.js';

/**
 * Handles blockquote elements
 */
export default class BlockquoteListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('insertblockquote', this);
        this.editor.root.addEventListener('deleteblockquote', this);
    }

    /**
     * Initializes elements
     *
     * @param {CustomEvent} event
     * @param {HTMLQuoteElement} event.detail.element
     * @return {void}
     */
    insertblockquote(event) {
        this.editor.dom.wrap(event.detail.element, TagName.FIGURE, { attributes: { class: Blockquote.name } });
    }

    /**
     * Removes parent figure element
     *
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.target
     * @return {void}
     */
    deleteblockquote(event) {
        if (event.detail.target.localName === TagName.FIGURE
            && event.detail.target.classList.contains(Blockquote.name)
        ) {
            event.detail.target.parentElement.removeChild(event.detail.target);
        }
    }
}
