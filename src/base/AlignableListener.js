import Listener from './Listener.js';
import { Key } from './enum.js';
import { isKey } from './util.js';

/**
 * Alignable Listener
 */
export default class AlignableListener extends Listener {
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
        if (event.detail.element.hasAttribute('data-alignable')) {
            event.detail.element.addEventListener('keydown', this);
        }
    }

    /**
     * Handles key combinations for alignment
     *
     * @param {KeyboardEvent} event
     * @param {HTMLElement} event.target
     * @return {void}
     */
    keydown(event) {
        const map = { [Key.UP]: null, [Key.LEFT]: 'left', [Key.DOWN]: 'center', [Key.RIGHT]: 'right' };

        if (event.target === event.currentTarget && isKey(event, Object.keys(map), { shift: true })) {
            event.preventDefault();
            event.stopPropagation();
            event.target.classList.remove(...Object.values(map));

            if (map[event.key]) {
                event.target.classList.add(map[event.key]);
            }
        }
    }
}
