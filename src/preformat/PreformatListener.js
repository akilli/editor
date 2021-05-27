import Listener from '../base/Listener.js';
import Preformat from './Preformat.js';
import { TagName } from '../base/enum.js';

/**
 * Handles preformatted text elements
 */
export default class PreformatListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('insertpre', this);
        this.editor.root.addEventListener('deletepre', this);
    }

    /**
     * Initializes elements
     *
     * @param {CustomEvent} event
     * @param {HTMLPreElement} event.detail.element
     * @return {void}
     */
    insertpre(event) {
        this.editor.dom.wrap(event.detail.element, TagName.FIGURE, { attributes: { class: Preformat.name } });
    }

    /**
     * Removes parent figure element
     *
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.target
     * @return {void}
     */
    deletepre(event) {
        if (event.detail.target.localName === TagName.FIGURE
            && event.detail.target.classList.contains(Preformat.name)
        ) {
            event.detail.target.parentElement.removeChild(event.detail.target);
        }
    }
}
