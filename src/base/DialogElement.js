import Key from './Key.js';

export default class DialogElement extends HTMLElement {
    /**
     * @return {boolean}
     */
    get open() {
        return this.hasAttribute('open');
    }

    /**
     * @param {boolean} state
     * @return {void}
     */
    set open(state) {
        state === true ? this.setAttribute('open', '') : this.removeAttribute('open');
    }

    /**
     * @borrows connectedCallback
     */
    constructor() {
        super();
        this.addEventListener('keydown', (event) => event.key === Key.ESC && this.close());
        this.addEventListener('click', (event) => event.target === this && this.close());
    }

    /**
     * @return {void}
     */
    connectedCallback() {
        this.setAttribute('role', 'dialog');
    }

    /**
     * @return {void}
     */
    show() {
        this.open = true;
        this.dispatchEvent(new CustomEvent('show', { detail: { element: this, target: this } }));
    }

    /**
     * @return {void}
     */
    close() {
        this.open = false;
        this.dispatchEvent(new CustomEvent('close', { detail: { element: this, target: this } }));
    }
}
