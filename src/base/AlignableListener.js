import Alignment from './Alignment.js';
import Key from './Key.js';
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
        const map = {
            [Key.UP]: Alignment.NONE,
            [Key.LEFT]: Alignment.LEFT,
            [Key.DOWN]: Alignment.CENTER,
            [Key.RIGHT]: Alignment.RIGHT,
        };

        if (event.target === event.currentTarget && Key.isEventFor(event, Object.keys(map), { shift: true })) {
            event.preventDefault();
            event.stopPropagation();
            event.target.classList.remove(...Alignment.values());
            map[event.key] !== Alignment.NONE && event.target.classList.add(map[event.key]);
        }
    }
}
