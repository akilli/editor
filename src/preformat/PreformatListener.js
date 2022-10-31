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
     * @param {HTMLPreElement} element
     * @return {void}
     */
    insertpre({ detail: { element } }) {
        this.editor.dom.wrap(element, TagName.FIGURE, { attributes: { class: Preformat.name } });
    }

    /**
     * Removes parent figure element
     *
     * @param {HTMLElement} target
     * @return {void}
     */
    deletepre({ detail: { target } }) {
        if (target.localName === TagName.FIGURE && target.classList.contains(Preformat.name)) {
            target.parentElement.removeChild(target);
        }
    }
}
