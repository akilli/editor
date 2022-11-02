import Listener from '../base/Listener.js';
import TagName from '../base/TagName.js';

export default class FigureListener extends Listener {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('insertfigure', this);
    }

    /**
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     * @return {void}
     */
    insertfigure({ detail: { element } }) {
        if (!element.querySelector(':scope > ' + TagName.FIGCAPTION)) {
            this.editor.dom.insertLastChild(this.editor.dom.createElement(TagName.FIGCAPTION), element);
        }
    }
}
