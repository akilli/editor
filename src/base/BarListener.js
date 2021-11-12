import Listener from './Listener.js';
import { Error, Key } from './enum.js';
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
        event.detail.element.getAttribute('data-command') && event.detail.element.addEventListener('click', this);
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
            throw Error.INVALID_ARGUMENT;
        }

        toolbar.hidden = false;
        const diff = element.offsetLeft + toolbar.clientWidth - this.editor.root.clientWidth;
        let left = toolbar.clientWidth < this.editor.root.clientWidth ? element.offsetLeft : 0;

        if (left > 0 && diff > 0) {
            left = left > diff ? left - diff : 0;
        }

        toolbar.style.left = `${left}px`;
        const top = element.offsetTop - element.scrollTop - toolbar.clientHeight;
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
