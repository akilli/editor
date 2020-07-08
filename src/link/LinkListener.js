import Listener from '../base/Listener.js';

/**
 * Handles link elements
 */
export default class LinkListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this._editor.root.addEventListener('sethtml', this);
        this._editor.root.addEventListener('inserta', this);
    }

    /**
     * Initializes link elements when editor html is set
     *
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     */
    sethtml(event) {
        Array.from(event.detail.element.getElementsByTagName('a')).forEach(item => this.__init(item));
    }

    /**
     * Initializes elements
     *
     * @param {CustomEvent} event
     * @param {HTMLAnchorElement} event.detail.element
     */
    inserta(event) {
        this.__init(event.detail.element);
    }

    /**
     * Initializes link element
     *
     * @private
     * @param {HTMLAnchorElement} element
     */
    __init(element) {
        const href = element.getAttribute('href');

        if (!href) {
            element.parentElement.replaceChild(this._editor.createText(element.textContent), element);
        } else {
            element.setAttribute('href', this._editor.url(href));
        }
    }
}
