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
     * @param {HTMLQuoteElement} element
     * @return {void}
     */
    insertblockquote({ detail: { element } }) {
        this.editor.dom.wrap(element, TagName.FIGURE, { attributes: { class: Blockquote.name } });
    }

    /**
     * Removes parent figure element
     *
     * @param {HTMLElement} target
     * @return {void}
     */
    deleteblockquote({ detail: { target } }) {
        if (target.localName === TagName.FIGURE && target.classList.contains(Blockquote.name)) {
            target.parentElement.removeChild(target);
        }
    }
}
