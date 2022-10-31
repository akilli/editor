import Listener from './Listener.js';
import { ErrorMessage, Key } from './enum.js';
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
     * @param {HTMLButtonElement} element
     * @return {void}
     */
    insertbutton({ detail: { element } }) {
        if (element.getAttribute('data-command')) {
            element.addEventListener('click', this);
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

    /**
     * Shows and positions toolbar for given element
     *
     * @protected
     * @param {HTMLElement} toolbar
     * @param {HTMLElement} element
     * @return {void}
     */
    _show(toolbar, element) {
        if (!(toolbar instanceof HTMLElement) || !(element instanceof HTMLElement)) {
            throw new Error(ErrorMessage.INVALID_ARGUMENT);
        }

        toolbar.hidden = false;
        const { x, y } = element.getBoundingClientRect();
        const { x: rx, y: ry } = this.editor.root.getBoundingClientRect();
        const diff = x - rx + toolbar.clientWidth - this.editor.root.clientWidth;
        const top = y - ry - element.scrollTop + this.editor.root.offsetTop - toolbar.clientHeight;
        let left = toolbar.clientWidth < this.editor.root.clientWidth ? x - rx : 0;

        if (left > 0 && diff > 0) {
            left = left > diff ? (left - diff) / 2 : 0;
        }

        toolbar.style.left = `${left}px`;
        toolbar.style.top = `${top}px`;
    }

    /**
     * Hides toolbar
     *
     * @protected
     * @param {HTMLElement} toolbar
     * @return {void}
     */
    _hide(toolbar) {
        toolbar.hidden = true;
        toolbar.removeAttribute('style');
    }
}
