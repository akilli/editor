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
        this._editor.root.addEventListener('sethtml', this);
        this._editor.root.addEventListener('insertimg', this);
    }

    /**
     * Initializes image elements when editor html is set
     *
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     */
    sethtml(event) {
        Array.from(event.detail.element.getElementsByTagName('img')).forEach(item => this.#init(item));
    }

    /**
     * Initializes elements
     *
     * @param {CustomEvent} event
     * @param {HTMLImageElement} event.detail.element
     */
    insertimg(event) {
        this.#init(event.detail.element);
    }

    /**
     * Initializes image element
     *
     * @param {HTMLImageElement} element
     */
    #init(element) {
        const src = element.getAttribute('src');

        if (!src) {
            element.parentElement.removeChild(element);
        } else {
            element.setAttribute('src', this._editor.url(src));
            this._editor.wrap(element, 'figure', {attributes: {class: 'image'}});
        }
    }
}
