import Listener from './Listener.js';

/**
 * Toolbar Listener
 */
export default class ToolbarListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.toolbar.addEventListener('insertbutton', this);
    }

    /**
     * Initializes button elements
     *
     * @param {CustomEvent} event
     * @param {HTMLButtonElement} event.detail.element
     */
    insertbutton(event) {
        event.detail.element.addEventListener('click', this);

        if (event.detail.element.parentElement === this.editor.toolbar) {
            event.detail.element.tabIndex = -1;
            event.detail.element.addEventListener('keydown', this);
        }
    }

    /**
     * Handles click events
     *
     * @param {MouseEvent} event
     * @param {HTMLElement} event.target
     */
    click(event) {
        this.editor.commands.execute(event.target.getAttribute('data-command'));
    }

    /**
     * Handles key combinations for navigation
     *
     * @param {KeyboardEvent} event
     * @param {HTMLElement} event.target
     */
    keydown(event) {
        if (this.editor.isKey(event, ['ArrowLeft', 'ArrowRight', 'Home', 'End'])) {
            const prev = event.target.previousElementSibling;
            const next = event.target.nextElementSibling;
            const first = event.target.parentElement.firstElementChild;
            const last = event.target.parentElement.lastElementChild;
            const isFirst = event.target === first;
            const isLast = event.target === last;

            if (event.key === 'ArrowLeft' && !isFirst) {
                prev.focus();
            } else if (event.key === 'ArrowRight' && !isLast) {
                next.focus();
            } else if (event.key === 'Home' || event.key === 'ArrowRight' && isLast) {
                first.focus();
            } else if (event.key === 'End' || event.key === 'ArrowLeft' && isFirst) {
                last.focus();
            }

            event.preventDefault();
            event.stopPropagation();
        }
    }
}
