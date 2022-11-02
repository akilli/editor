import Listener from '../base/Listener.js';
import Preformat from './Preformat.js';
import TagName from '../base/TagName.js';

export default class PreformatListener extends Listener {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('insertpre', this);
        this.editor.root.addEventListener('deletepre', this);
    }

    /**
     * @param {CustomEvent} event
     * @param {HTMLPreElement} event.detail.element
     * @return {void}
     */
    insertpre({ detail: { element } }) {
        this.editor.dom.wrap(element, TagName.FIGURE, { attributes: { class: Preformat.name } });
    }

    /**
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.target
     * @return {void}
     */
    deletepre({ detail: { target } }) {
        if (target.localName === TagName.FIGURE && target.classList.contains(Preformat.name)) {
            target.parentElement.removeChild(target);
        }
    }
}
