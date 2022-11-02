import Audio from './Audio.js';
import Listener from '../base/Listener.js';
import TagName from '../base/TagName.js';

export default class AudioListener extends Listener {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('sethtml', this);
        this.editor.root.addEventListener('insertaudio', this);
    }

    /**
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     * @return {void}
     */
    sethtml({ detail: { element } }) {
        Array.from(element.getElementsByTagName(TagName.AUDIO)).forEach((item) => this.#init(item));
    }

    /**
     * @param {CustomEvent} event
     * @param {HTMLAudioElement} event.detail.element
     * @return {void}
     */
    insertaudio({ detail: { element } }) {
        this.#init(element);
    }

    /**
     * Adds controls and wraps in figure if necessary
     *
     * @param {HTMLAudioElement} element
     * @return {void}
     */
    #init(element) {
        const src = element.getAttribute('src');

        if (!src) {
            element.parentElement.removeChild(element);
        } else {
            element.setAttribute('src', this.editor.url(src));
            element.controls = true;
            this.editor.dom.wrap(element, TagName.FIGURE, { attributes: { class: Audio.name } });
        }
    }
}
