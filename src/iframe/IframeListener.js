import Iframe from './Iframe.js';
import Listener from '../base/Listener.js';
import TagName from '../base/TagName.js';

export default class IframeListener extends Listener {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('sethtml', this);
        this.editor.root.addEventListener('insertiframe', this);
    }

    /**
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     * @return {void}
     */
    sethtml({ detail: { element } }) {
        Array.from(element.getElementsByTagName(TagName.IFRAME)).forEach((item) => this.#init(item));
    }

    /**
     * @param {CustomEvent} event
     * @param {HTMLIFrameElement} event.detail.element
     * @return {void}
     */
    insertiframe({ detail: { element } }) {
        this.#init(element);
    }

    /**
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
