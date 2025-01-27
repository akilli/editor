import Listener from '../base/Listener.js';
import TagName from '../base/TagName.js';

export default class DetailsListener extends Listener {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('insertdetails', this);
    }

    /**
     * @param {CustomEvent} event
     * @param {HTMLDetailsElement} event.detail.element
     * @return {void}
     */
    insertdetails({ detail: { element } }) {
        element.open = true;

        if (!element.querySelector(`:scope > ${TagName.SUMMARY}:first-child`)) {
            this.editor.dom.insertFirstChild(this.editor.dom.createElement(TagName.SUMMARY), element);
        }
    }
}
