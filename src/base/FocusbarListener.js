import BarListener from './BarListener.js';
import { Error } from './enum.js';

/**
 * Focusbar Listener
 */
export default class FocusbarListener extends BarListener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.focusbar.addEventListener('insertbutton', this);
        this.editor.root.addEventListener('focusin', this);
        this.editor.root.addEventListener('focusout', this);
        this.editor.dom.document.addEventListener('selectionchange', this);
    }

    /**
     * @inheritDoc
     */
    insertbutton(event) {
        super.insertbutton(event);

        if (event.detail.element.getAttribute('data-command')) {
            event.detail.element.addEventListener('mousedown', this);
        }
    }

    /**
     * Handles mousedown events
     *
     * @param {MouseEvent} event
     * @return {void}
     */
    mousedown(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    /**
     * Shows the focusbar on focusin if element is focusable
     *
     * @param {FocusEvent} event
     * @param {HTMLElement} event.target
     * @return {void}
     */
    focusin(event) {
        this.#show(event.target);
    }

    /**
     * Hides the focusbar on focusout
     *
     * @return {void}
     */
    focusout() {
        this.#hide();
    }

    /**
     * Hides focusbar if current selection is not collapsed
     *
     * @return {void}
     */
    selectionchange() {
        const element = this.editor.dom.getActiveElement();

        if (!this.editor.dom.getSelection().isCollapsed || !element) {
            this.#hide();
        } else if (element) {
            this.#show(element);
        }
    }

    /**
     * Shows the focusbar
     *
     * @param {HTMLElement} element
     * @return {void}
     */
    #show(element) {
        if (!(element instanceof HTMLElement)) {
            throw Error.INVALID_ARGUMENT;
        }

        if (element.hasAttribute('data-focusable')) {
            this.editor.focusbar.hidden = false;
            const top = element.offsetTop + element.offsetParent.offsetTop - this.editor.focusbar.clientHeight;
            this.editor.focusbar.style.top = `${top}px`;

            for (const key in element.dataset) {
                this.editor.focusbar.dataset[key] = element.dataset[key];
            }
        }
    }

    /**
     * Hides the focusbar
     *
     * @return {void}
     */
    #hide() {
        this.editor.focusbar.hidden = true;
        this.editor.focusbar.removeAttribute('style');

        for (const key in this.editor.focusbar.dataset) {
            delete this.editor.focusbar.dataset[key];
        }
    }
}
