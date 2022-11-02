import Key from './Key.js';
import Listener from './Listener.js';

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
        if (event.target === event.currentTarget && Key.isEventFor(event, Key.DEL, { ctrl: true })) {
            this.editor.dom.delete(event.target);
            event.preventDefault();
            event.stopPropagation();
        }
    }
}
