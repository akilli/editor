import Image from './Image.js';
import Listener from '../base/Listener.js';
import TagName from '../base/TagName.js';

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
     * @param {HTMLElement} element
     * @return {void}
     */
    sethtml({ detail: { element } }) {
        Array.from(element.getElementsByTagName(TagName.IMG)).forEach((item) => this.#init(item));
    }

    /**
     * Initializes elements
     *
     * @param {HTMLImageElement} element
     * @return {void}
     */
    insertimg({ detail: { element } }) {
        this.#init(element);
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
            this.editor.dom.wrap(element, TagName.FIGURE, { attributes: { class: Image.name } });
        }
    }
}
