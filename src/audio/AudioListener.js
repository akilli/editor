import Listener from '../base/Listener.js';

/**
 * Handles audio elements
 */
export default class AudioListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('sethtml', this);
        this.editor.root.addEventListener('insertaudio', this);
    }

    /**
     * Initializes audio elements when editor html is set
     *
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     */
    sethtml(event) {
        Array.from(event.detail.element.getElementsByTagName('audio')).forEach(item => this.__init(item));
    }

    /**
     * Initializes elements
     *
     * @param {CustomEvent} event
     * @param {HTMLAudioElement} event.detail.element
     */
    insertaudio(event) {
        this.__init(event.detail.element);
    }

    /**
     * Adds controls and wraps in figure if necessary
     *
     * @private
     * @param {HTMLAudioElement} element
     */
    __init(element) {
        const src = element.getAttribute('src');

        if (!src) {
            element.parentElement.removeChild(element);
        }

        element.setAttribute('src', this.editor.url(src));
        element.controls = true;
        this.editor.wrap(element, 'figure', {attributes: {class: 'audio'}});
    }
}
