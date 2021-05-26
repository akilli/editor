import Base from './Base.js';
import Key from './Key.js';
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
        this.editor.formats.addEventListener('insertbutton', this);
        this.editor.dom.document.addEventListener('selectionchange', this);
    }

    /**
     * Initializes button elements
     *
     * @param {CustomEvent} event
     * @param {HTMLButtonElement} event.detail.element
     * @return {void}
     */
    insertbutton(event) {
        const key = event.detail.element.getAttribute('data-key');

        if (key) {
            const alt = this.editor.translator.translate(Base.name, 'Alt');
            const shift = this.editor.translator.translate(Base.name, 'Shift');
            event.detail.element.title += ` [${alt} + ${shift} + ${key}]`;
        }

        if (event.detail.element.getAttribute('data-command')) {
            event.detail.element.addEventListener('click', this);
        }

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
     * @return {void}
     */
    click(event) {
        this.editor.commands.execute(event.target.getAttribute('data-command'));
    }

    /**
     * Handles key combinations for navigation
     *
     * @param {KeyboardEvent} event
     * @param {HTMLElement} event.target
     * @return {void}
     */
    keydown(event) {
        if (this.editor.isKey(event, [Key.LEFT, Key.RIGHT, Key.HOME, Key.END])) {
            const prev = event.target.previousElementSibling;
            const next = event.target.nextElementSibling;
            const first = event.target.parentElement.firstElementChild;
            const last = event.target.parentElement.lastElementChild;
            const isFirst = event.target === first;
            const isLast = event.target === last;

            if (event.key === Key.LEFT && !isFirst) {
                prev.focus();
            } else if (event.key === Key.RIGHT && !isLast) {
                next.focus();
            } else if (event.key === Key.HOME || event.key === Key.RIGHT && isLast) {
                first.focus();
            } else if (event.key === Key.END || event.key === Key.LEFT && isFirst) {
                last.focus();
            }

            event.preventDefault();
            event.stopPropagation();
        }
    }

    /**
     * Shows or hides format toolbar depending on current selection
     * @return {void}
     */
    selectionchange() {
        const editable = this.editor.dom.getSelectedEditable();

        if (editable
            && !this.editor.dom.getSelection().isCollapsed
            && this.editor.tags.allowed(editable, 'format', true)
        ) {
            const top = editable.offsetTop + editable.offsetParent.offsetTop - this.editor.formats.clientHeight;
            this.editor.formats.style.top = `${top}px`;
            this.editor.formats.hidden = false;
        } else {
            this.editor.formats.hidden = true;
            this.editor.formats.removeAttribute('style');
        }
    }
}
