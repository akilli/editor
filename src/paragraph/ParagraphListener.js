import Listener from '../base/Listener.js';
import TagName from '../base/TagName.js';

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
     * @param {HTMLElement} element
     * @return {void}
     */
    sethtml({ detail: { element } }) {
        Array.from(element.getElementsByTagName(TagName.P)).forEach((item) => this.#init(item));
    }

    /**
     * Initializes elements
     *
     * @param {HTMLParagraphElement} element
     * @return {void}
     */
    insertp({ detail: { element } }) {
        this.#init(element);
    }

    /**
     * Initializes paragraph element
     *
     * @param {HTMLParagraphElement} element
     * @return {void}
     */
    #init(element) {
        element.addEventListener('paste', this);
    }

    /**
     * Handles paste event
     *
     * @param {ClipboardEvent} event
     * @param {HTMLParagraphElement} event.target
     * @return {void}
     */
    paste(event) {
        this.editor.dom.window.setTimeout(() => this.editor.filters.filter(event.target));
    }
}
