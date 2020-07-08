import Listener from './Listener.js';

/**
 * Alignable Listener
 */
export default class AlignableListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this._editor.root.addEventListener('insert', this);
    }

    /**
     * Initializes elements
     *
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
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
     */
    keydown(event) {
        const map = {ArrowUp: null, ArrowLeft: 'left', ArrowDown: 'center', ArrowRight: 'right'};

        if (event.target === event.currentTarget && this._editor.isKey(event, Object.keys(map), {shift: true})) {
            event.preventDefault();
            event.stopPropagation();
            event.target.classList.remove(...Object.values(map));

            if (map[event.key]) {
                event.target.classList.add(map[event.key]);
            }
        }
    }
}
