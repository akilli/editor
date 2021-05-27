/**
 * Block Element
 */
export default class BlockElement extends HTMLElement {
    /**
     * Returns shadow roots innerHTML
     *
     * @return {string}
     */
    get content() {
        return this.shadowRoot.innerHTML;
    }

    /**
     * Sets shadow roots innerHTML
     *
     * @param {string} val
     * @return {void}
     */
    set content(val) {
        this.shadowRoot.innerHTML = val;
    }

    /**
     * Initializes new block element
     */
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
}
