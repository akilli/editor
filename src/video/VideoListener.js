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
        this._editor.root.addEventListener('sethtml', this);
        this._editor.root.addEventListener('insertvideo', this);
    }

    /**
     * Initializes video elements when editor html is set
     *
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     */
    sethtml(event) {
        Array.from(event.detail.element.getElementsByTagName('video')).forEach(item => this.__init(item));
    }

    /**
     * Initializes elements
     *
     * @param {CustomEvent} event
     * @param {HTMLVideoElement} event.detail.element
     */
    insertvideo(event) {
        this.__init(event.detail.element);
    }

    /**
     * Initializes video element
     *
     * @private
     * @param {HTMLVideoElement} element
     */
    __init(element) {
        const src = element.getAttribute('src');

        if (!src) {
            element.parentElement.removeChild(element);
        } else {
            element.setAttribute('src', this._editor.url(src));
            element.controls = true;
            this._editor.wrap(element, 'figure', {attributes: {class: 'video'}});
        }
    }
}
