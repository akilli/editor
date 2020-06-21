import Listener from '../base/Listener.js';

/**
 * Handles paragraph elements
 */
export default class ParagraphListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('sethtml', this);
        this.editor.root.addEventListener('insertp', this);
    }

    /**
     * Initializes paragraph elements when editor html is set
     *
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     */
    sethtml(event) {
        Array.from(event.detail.element.getElementsByTagName('p')).forEach(item => this.__init(item));
    }

    /**
     * Initializes elements
     *
     * @param {CustomEvent} event
     * @param {HTMLParagraphElement} event.detail.element
     */
    insertp(event) {
        this.__init(event.detail.element);
    }

    /**
     * Initializes paragraph element
     *
     * @private
     * @param {HTMLParagraphElement} element
     */
    __init(element) {
        element.addEventListener('paste', this);
    }

    /**
     * Handles paste event
     *
     * @param {ClipboardEvent} event
     * @param {HTMLParagraphElement} event.target
     */
    paste(event) {
        this.editor.window.setTimeout(() => this.editor.filters.filter(event.target));
    }
}
