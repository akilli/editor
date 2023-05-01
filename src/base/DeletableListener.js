import Listener from './Listener.js';
import { Key, isKey } from './Key.js';

export default class DeletableListener extends Listener {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('insert', this);
    }

    /**
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     * @return {void}
     */
    insert({ detail: { element } }) {
        if (element.hasAttribute('data-deletable')) {
            element.addEventListener('keydown', this);
        }
    }

    /**
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
