import Listener from '../base/Listener.js';
import TagName from '../base/TagName.js';

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
     * @param {HTMLElement} element
     * @return {void}
     */
    sethtml({ detail: { element } }) {
        Array.from(element.getElementsByTagName(TagName.A)).forEach(item => this.#init(item));
    }

    /**
     * Initializes elements
     *
     * @param {HTMLAnchorElement} element
     * @return {void}
     */
    inserta({ detail: { element } }) {
        this.#init(element);
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
            element.parentElement.replaceChild(this.editor.dom.createText(element.textContent), element);
        } else {
            element.setAttribute('href', this.editor.url(href));
        }
    }
}
