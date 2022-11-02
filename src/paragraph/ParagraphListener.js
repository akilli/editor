import Listener from '../base/Listener.js';
import TagName from '../base/TagName.js';

export default class ParagraphListener extends Listener {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('sethtml', this);
        this.editor.root.addEventListener('insertp', this);
    }

    /**
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     * @return {void}
     */
    sethtml({ detail: { element } }) {
        Array.from(element.getElementsByTagName(TagName.P)).forEach((item) => item.addEventListener('paste', this));
    }

    /**
     * @param {CustomEvent} event
     * @param {HTMLParagraphElement} event.detail.element
     * @return {void}
     */
    insertp({ detail: { element } }) {
        element.addEventListener('paste', this);
    }

    /**
     * @param {ClipboardEvent} event
     * @param {HTMLParagraphElement} event.target
     * @return {void}
     */
    paste({ target }) {
        this.editor.dom.window.setTimeout(() => this.editor.filters.filter(target));
    }
}
