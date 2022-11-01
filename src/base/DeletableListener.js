import Key from './Key.js';
import Listener from './Listener.js';
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
     * @param {HTMLElement} element
     * @return {void}
     */
    insert({ detail: { element } }) {
        if (element.hasAttribute('data-deletable')) {
            element.addEventListener('keydown', this);
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
            this.editor.dom.delete(event.target);
            event.preventDefault();
            event.stopPropagation();
        }
    }
}
