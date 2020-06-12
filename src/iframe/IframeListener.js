import Listener from '../base/Listener.js';

/**
 * Handles iframe elements
 */
export default class IframeListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.content.addEventListener('sethtml', this);
        this.editor.content.addEventListener('insertiframe', this);
    }

    /**
     * Initializes iframe elements when editor html is set
     *
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     */
    sethtml(event) {
        Array.from(event.detail.element.getElementsByTagName('iframe')).forEach(item => this.__init(item));
    }

    /**
     * Initializes elements
     *
     * @param {CustomEvent} event
     * @param {HTMLIFrameElement} event.detail.element
     */
    insertiframe(event) {
        this.__init(event.detail.element);
    }

    /**
     * Initializes iframe element
     *
     * @private
     * @param {HTMLIFrameElement} element
     */
    __init(element) {
        const src = element.getAttribute('src');

        if (!src) {
            element.parentElement.removeChild(element);
        }

        element.setAttribute('src', this.editor.url(src));
        element.allowFullscreen = true;
        this.editor.wrap(element, 'figure', {attributes: {class: 'iframe'}});
    }
}
