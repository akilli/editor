import BarListener from './BarListener.js';

export default class FocusbarListener extends BarListener {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor);
        this.editor.focusbar.addEventListener('insertbutton', this);
        this.editor.root.addEventListener('focusin', this);
        this.editor.root.addEventListener('focusout', this);
        this.editor.dom.document.addEventListener('selectionchange', this);
    }

    /**
     * @param {CustomEvent} event
     * @param {HTMLButtonElement} event.detail.element
     * @return {void}
     */
    insertbutton(event) {
        super.insertbutton(event);

        if (event.detail.element.getAttribute('data-command')) {
            event.detail.element.addEventListener('mousedown', this);
        }
    }

    /**
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
    focusin({ target }) {
        if (target instanceof HTMLElement && target.hasAttribute('data-focusable')) {
            this.#show(target);
        }
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
        } else if (element instanceof HTMLElement && element.hasAttribute('data-focusable')) {
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
        if (!this.editor.focusbar.children.length) {
            return;
        }

        Object.keys(element.dataset).forEach((key) => (this.editor.focusbar.dataset[key] = element.dataset[key]));
        this.editor.focusbar.dataset.tag = element.localName;
        this._show(this.editor.focusbar, element);
    }

    /**
     * Hides the focusbar
     *
     * @return {void}
     */
    #hide() {
        this._hide(this.editor.focusbar);
        Object.keys(this.editor.focusbar.dataset).forEach((key) => delete this.editor.focusbar.dataset[key]);
    }
}
