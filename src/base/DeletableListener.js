import Listener from './Listener.js';
import { Key } from './enum.js';
import { isKey } from './util.js';

/**
 * Deletable Listener
 */
export default class DeletableListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('insert', this);
    }

    /**
     * Initializes elements
     *
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     * @return {void}
     */
    insert(event) {
        if (event.detail.element.hasAttribute('data-deletable')) {
            event.detail.element.addEventListener('keydown', this);
        }
    }

    /**
     * Handles key combinations for delete
     *
     * @param {KeyboardEvent} event
     * @param {HTMLElement} event.target
     * @return {void}
     */
    keydown(event) {
        if (event.target === event.currentTarget && isKey(event, Key.DEL, { ctrl: true })) {
            if (event.target.previousElementSibling instanceof HTMLElement) {
                this.editor.dom.focusEnd(event.target.previousElementSibling);
            }

            event.target.parentElement.removeChild(event.target);
            event.preventDefault();
            event.stopPropagation();
        }
    }
}
