import Alignment from './Alignment.js';
import Key, { isEventFor } from './Key.js';
import Listener from './Listener.js';

export default class AlignableListener extends Listener {
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
        if (element.hasAttribute('data-alignable')) {
            element.addEventListener('keydown', this);
        }
    }

    /**
     * @param {KeyboardEvent} event
     * @param {HTMLElement} event.target
     * @return {void}
     */
    keydown(event) {
        /** @type {Object<Key, Alignment>} */
        const map = {
            [Key.ARROWUP]: Alignment.NONE,
            [Key.ARROWLEFT]: Alignment.LEFT,
            [Key.ARROWDOWN]: Alignment.CENTER,
            [Key.ARROWRIGHT]: Alignment.RIGHT,
        };

        if (event.target === event.currentTarget && isEventFor(event, Object.keys(map), { shift: true })) {
            event.preventDefault();
            event.stopPropagation();
            this.editor.dom.removeClass(event.target, ...Object.values(Alignment));
            map[event.key] !== Alignment.NONE && event.target.classList.add(map[event.key]);
        }
    }
}
