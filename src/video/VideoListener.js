import Listener from '../base/Listener.js';
import Video from './Video.js';
import { TagName } from '../base/enum.js';

/**
 * Handles video elements
 */
export default class VideoListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('sethtml', this);
        this.editor.root.addEventListener('insertvideo', this);
    }

    /**
     * Initializes video elements when editor html is set
     *
     * @param {HTMLElement} element
     * @return {void}
     */
    sethtml({ detail: { element } }) {
        Array.from(element.getElementsByTagName(TagName.VIDEO)).forEach(item => this.#init(item));
    }

    /**
     * Initializes elements
     *
     * @param {HTMLVideoElement} element
     * @return {void}
     */
    insertvideo({ detail: { element } }) {
        this.#init(element);
    }

    /**
     * Initializes video element
     *
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
