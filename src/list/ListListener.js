import Listener from '../base/Listener.js';

/**
 * Handles list elements
 */
export default class ListListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.content.addEventListener('sethtml', this);
        this.editor.content.addEventListener('insertli', this);
        this.editor.content.addEventListener('deleteli', this);
    }

    /**
     * Initializes list item elements when editor html is set
     *
     * @private
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     */
    sethtml(event) {
        event.detail.element.querySelectorAll('li').forEach(item => this.init(item));
    }

    /**
     * Initializes listitem elements
     *
     * @private
     * @param {CustomEvent} event
     * @param {HTMLLIElement} event.detail.element
     */
    insertli(event) {
        this.init(event.detail.element);
    }

    /**
     * Initializes listitem elements
     *
     * @private
     * @param {HTMLLIElement} element
     */
    init(element) {
        if (!(element.parentElement instanceof HTMLOListElement) && !(element.parentElement instanceof HTMLUListElement)) {
            this.editor.wrap(element, 'ul');
        }
    }

    /**
     * Initializes listitem elements
     *
     * @private
     * @param {CustomEvent} event
     * @param {HTMLOListElement|HTMLUListElement} event.detail.target
     */
    deleteli(event) {
        if (event.detail.target.children.length === 0) {
            event.detail.target.parentElement.removeChild(event.detail.target);
        }
    }
}
