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
        this.editor.content.addEventListener('sethtml', this);
        this.editor.content.addEventListener('insertaudio', this);
    }

    /**
     * Initializes audio elements when editor html is set
     *
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     */
    sethtml(event) {
        event.detail.element.querySelectorAll('audio').forEach(item => this.init(item));
    }

    /**
     * Initializes elements
     *
     * @param {CustomEvent} event
     * @param {HTMLAudioElement} event.detail.element
     */
    insertaudio(event) {
        this.init(event.detail.element);
    }

    /**
     * Adds controls and wraps in figure if necessary
     *
     * @private
     * @param {HTMLAudioElement} element
     */
    init(element) {
        element.controls = true;
        this.editor.wrap(element, 'figure', {attributes: {class: 'audio'}});
    }
}
