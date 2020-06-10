import Listener from '../base/Listener.js';

/**
 * Handles image elements
 */
export default class ImageListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.content.addEventListener('sethtml', this);
        this.editor.content.addEventListener('insertimg', this);
    }

    /**
     * Initializes image elements when editor html is set
     *
     * @private
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     */
    sethtml(event) {
        event.detail.element.querySelectorAll('img').forEach(item => this.init(item));
    }

    /**
     * Initializes elements
     *
     * @private
     * @param {CustomEvent} event
     * @param {HTMLImageElement} event.detail.element
     */
    insertimg(event) {
        this.init(event.detail.element);
    }

    /**
     * Initializes image element
     *
     * @private
     * @param {HTMLImageElement} element
     */
    init(element) {
        this.editor.wrap(element, 'figure', {attributes: {class: 'image'}});
    }
}
