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
        this.editor.content.addEventListener('insertol', this);
        this.editor.content.addEventListener('insertul', this);
    }

    /**
     * Initializes list item elements when editor html is set
     *
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     */
    sethtml(event) {
        Array.from(event.detail.element.getElementsByTagName('li')).forEach(item => this.__init(item));
    }

    /**
     * Initializes listitem elements
     *
     * @param {CustomEvent} event
     * @param {HTMLLIElement} event.detail.element
     */
    insertli(event) {
        this.__init(event.detail.element);
    }

    /**
     * Removes parent element too if deleted listitem was the only child
     *
     * @param {CustomEvent} event
     * @param {HTMLOListElement|HTMLUListElement} event.detail.target
     */
    deleteli(event) {
        if (event.detail.target.children.length === 0) {
            event.detail.target.parentElement.removeChild(event.detail.target);
        }
    }

    /**
     * Initializes orderedlist elements
     *
     * @param {CustomEvent} event
     * @param {HTMLOListElement} event.detail.element
     */
    insertol(event) {
        if (event.detail.element.children.length === 0) {
            event.detail.element.appendChild(this.editor.createElement('li'));
        }
    }

    /**
     * Initializes unorderedlist elements
     *
     * @param {CustomEvent} event
     */
    insertul(event) {
        this.insertol(event);
    }

    /**
     * Initializes listitem elements
     *
     * @private
     * @param {HTMLLIElement} element
     */
    __init(element) {
        if (!(element.parentElement instanceof HTMLOListElement) && !(element.parentElement instanceof HTMLUListElement)) {
            this.editor.wrap(element, 'ul');
        }
    }
}
