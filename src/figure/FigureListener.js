import Listener from '../base/Listener.js';
import TagName from '../base/TagName.js';

/**
 * Creates missing figcaption elements
 */
export default class FigureListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('insertfigure', this);
    }

    /**
     * Initializes elements
     *
     * @param {HTMLElement} element
     * @return {void}
     */
    insertfigure({ detail: { element } }) {
        if (!element.querySelector(':scope > ' + TagName.FIGCAPTION)) {
            this.editor.dom.insertLastChild(this.editor.dom.createElement(TagName.FIGCAPTION), element);
        }
    }
}
