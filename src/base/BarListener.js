import Key from './Key.js';
import Listener from './Listener.js';

/**
 * @abstract
 */
export default class BarListener extends Listener {
    /**
     * @param {CustomEvent} event
     * @param {HTMLButtonElement} event.detail.element
     * @return {void}
     */
    insertbutton({ target, detail: { element } }) {
        if (element.getAttribute('data-command')) {
            element.addEventListener('click', this);
        }

        element.tabIndex = element === target.firstElementChild ? 0 : -1;
        element.addEventListener('keydown', this);
    }

    /**
     * @param {MouseEvent} event
     * @param {HTMLElement} event.target
     * @return {void}
     */
    click({ target }) {
        this.editor.commands.execute(target.getAttribute('data-command'));
    }

    /**
     * @param {KeyboardEvent} event
     * @param {HTMLElement} event.target
     * @return {void}
     */
    keydown(event) {
        if (Key.isEventFor(event, [Key.ARROWLEFT, Key.ARROWRIGHT, Key.HOME, Key.END])) {
            const prev = event.target.previousElementSibling;
            const next = event.target.nextElementSibling;
            const first = event.target.parentElement.firstElementChild;
            const last = event.target.parentElement.lastElementChild;
            const isFirst = event.target === first;
            const isLast = event.target === last;

            if (event.key === Key.ARROWLEFT && !isFirst) {
                prev.focus();
            } else if (event.key === Key.ARROWRIGHT && !isLast) {
                next.focus();
            } else if (event.key === Key.HOME || (event.key === Key.ARROWRIGHT && isLast)) {
                first.focus();
            } else if (event.key === Key.END || (event.key === Key.ARROWLEFT && isFirst)) {
                last.focus();
            }

            event.preventDefault();
            event.stopPropagation();
        }
    }

    /**
     * @protected
     * @param {HTMLElement} toolbar
     * @param {HTMLElement} element
     * @return {void}
     */
    _show(toolbar, element) {
        if (!(toolbar instanceof HTMLElement) || !(element instanceof HTMLElement)) {
            throw new TypeError('Invalid argument');
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
     * @protected
     * @param {HTMLElement} toolbar
     * @return {void}
     */
    _hide(toolbar) {
        toolbar.hidden = true;
        toolbar.removeAttribute('style');
    }
}
