/**
 * Dialog Element
 */
export default class DialogElement extends HTMLElement {
    /**
     * Indicates dialog state
     *
     * @return {boolean}
     */
    get open() {
        return this.hasAttribute('open');
    }

    /**
     * Sets dialog state
     *
     * @param {boolean} state
     */
    set open(state) {
        state === true ? this.setAttribute('open', '') : this.removeAttribute('open');
    }

    /**
     * Initializes new dialog element
     *
     * @borrows this.connectedCallback
     */
    constructor() {
        super();
        this.addEventListener('keydown', event => event.key === 'Escape' && this.close());
        this.addEventListener('click', event => event.target === this && this.close());
    }

    /**
     * Runs when element is added to the DOM
     */
    connectedCallback() {
        this.setAttribute('role', 'dialog');
        this.tabIndex = -1;
        this.focus();
    }

    /**
     * Shows dialog and dispatches show event
     */
    show() {
        this.open = true;
        this.dispatchEvent(new CustomEvent('show', {detail: {element: this, target: this}}));
    }

    /**
     * Closes dialog and dispatches close event
     */
    close() {
        this.open = false;
        this.dispatchEvent(new CustomEvent('close', {detail: {element: this, target: this}}));
    }
}
