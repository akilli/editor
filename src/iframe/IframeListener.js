import Iframe from './Iframe.js';
import Listener from '../base/Listener.js';
import TagName from '../base/TagName.js';

/**
 * Handles iframe elements
 */
export default class IframeListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('sethtml', this);
        this.editor.root.addEventListener('insertiframe', this);
    }

    /**
     * Initializes iframe elements when editor html is set
     *
     * @param {HTMLElement} element
     * @return {void}
     */
    sethtml({ detail: { element } }) {
        Array.from(element.getElementsByTagName(TagName.IFRAME)).forEach(item => this.#init(item));
    }

    /**
     * Initializes elements
     *
     * @param {HTMLIFrameElement} element
     * @return {void}
     */
    insertiframe({ detail: { element } }) {
        this.#init(element);
    }

    /**
     * Initializes iframe element
     *
     * @param {HTMLIFrameElement} element
     * @return {void}
     */
    #init(element) {
        const src = element.getAttribute('src');

        if (!src) {
            element.parentElement.removeChild(element);
        } else {
            element.setAttribute('src', this.editor.url(src));
            element.allowFullscreen = true;
            this.editor.dom.wrap(element, TagName.FIGURE, { attributes: { class: Iframe.name } });
        }
    }
}
