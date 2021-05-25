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
        this.editor.root.addEventListener('sethtml', this);
        this.editor.root.addEventListener('insertimg', this);
    }

    /**
     * Initializes image elements when editor html is set
     *
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     * @return {void}
     */
    sethtml(event) {
        Array.from(event.detail.element.getElementsByTagName('img')).forEach(item => this.#init(item));
    }

    /**
     * Initializes elements
     *
     * @param {CustomEvent} event
     * @param {HTMLImageElement} event.detail.element
     * @return {void}
     */
    insertimg(event) {
        this.#init(event.detail.element);
    }

    /**
     * Initializes image element
     *
     * @param {HTMLImageElement} element
     * @return {void}
     */
    #init(element) {
        const src = element.getAttribute('src');

        if (!src) {
            element.parentElement.removeChild(element);
        } else {
            element.setAttribute('src', this.editor.url(src));
            this.editor.wrap(element, 'figure', {attributes: {class: 'image'}});
        }
    }
}
