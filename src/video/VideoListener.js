import Listener from '../base/Listener.js';

/**
 * Handles video elements
 */
export default class VideoListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.content.addEventListener('sethtml', this);
        this.editor.content.addEventListener('insertvideo', this);
    }

    /**
     * Initializes video elements when editor html is set
     *
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     */
    sethtml(event) {
        event.detail.element.querySelectorAll('video').forEach(item => this.init(item));
    }

    /**
     * Initializes elements
     *
     * @param {CustomEvent} event
     * @param {HTMLVideoElement} event.detail.element
     */
    insertvideo(event) {
        this.init(event.detail.element);
    }

    /**
     * Initializes video element
     *
     * @private
     * @param {HTMLVideoElement} element
     */
    init(element) {
        element.controls = true;
        this.editor.wrap(element, 'figure', {attributes: {class: 'video'}});
    }
}
