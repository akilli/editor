import Base from './Base.js';
import Listener from './Listener.js';
import { Key } from './enum.js';
import { isKey } from './util.js';

/**
 * Abstract Bar Listener
 *
 * @abstract
 */
export default class BarListener extends Listener {
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
        if (isKey(event, [Key.LEFT, Key.RIGHT, Key.HOME, Key.END])) {
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
}
