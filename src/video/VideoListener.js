import Listener from '../base/Listener.js';
import TagName from '../base/TagName.js';
import Video from './Video.js';

export default class VideoListener extends Listener {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('sethtml', this);
        this.editor.root.addEventListener('insertvideo', this);
    }

    /**
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     * @return {void}
     */
    sethtml({ detail: { element } }) {
        Array.from(element.getElementsByTagName(TagName.VIDEO)).forEach((item) => this.#init(item));
    }

    /**
     * @param {CustomEvent} event
     * @param {HTMLVideoElement} event.detail.element
     * @return {void}
     */
    insertvideo({ detail: { element } }) {
        this.#init(element);
    }

    /**
     * @param {HTMLVideoElement} element
     * @return {void}
     */
    #init(element) {
        const src = element.getAttribute('src');

        if (!src) {
            element.parentElement.removeChild(element);
        } else {
            element.setAttribute('src', this.editor.url(src));
            element.controls = true;
            this.editor.dom.wrap(element, TagName.FIGURE, { attributes: { class: Video.name } });
        }
    }
}
