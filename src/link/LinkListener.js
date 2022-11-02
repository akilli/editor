import Listener from '../base/Listener.js';
import TagName from '../base/TagName.js';

export default class LinkListener extends Listener {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('sethtml', this);
        this.editor.root.addEventListener('inserta', this);
    }

    /**
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     * @return {void}
     */
    sethtml({ detail: { element } }) {
        Array.from(element.getElementsByTagName(TagName.A)).forEach((item) => this.#init(item));
    }

    /**
     * @param {CustomEvent} event
     * @param {HTMLAnchorElement} event.detail.element
     * @return {void}
     */
    inserta({ detail: { element } }) {
        this.#init(element);
    }

    /**
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
