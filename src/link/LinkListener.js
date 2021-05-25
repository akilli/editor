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
        this.editor.root.addEventListener('sethtml', this);
        this.editor.root.addEventListener('inserta', this);
    }

    /**
     * Initializes link elements when editor html is set
     *
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     * @return {void}
     */
    sethtml(event) {
        Array.from(event.detail.element.getElementsByTagName('a')).forEach(item => this.#init(item));
    }

    /**
     * Initializes elements
     *
     * @param {CustomEvent} event
     * @param {HTMLAnchorElement} event.detail.element
     * @return {void}
     */
    inserta(event) {
        this.#init(event.detail.element);
    }

    /**
     * Initializes link element
     *
     * @param {HTMLAnchorElement} element
     * @return {void}
     */
    #init(element) {
        const href = element.getAttribute('href');

        if (!href) {
            element.parentElement.replaceChild(this.editor.createText(element.textContent), element);
        } else {
            element.setAttribute('href', this.editor.url(href));
        }
    }
}
