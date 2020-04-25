/**
 * Block Element
 */
export default class BlockElement extends HTMLElement {
    /**
     * Initializes new block element
     */
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    /**
     * Returns shadow roots innerHTML
     *
     * @return {String}
     */
    get content() {
        return this.shadowRoot.innerHTML;
    }

    /**
     * Sets shadow roots innerHTML
     *
     * @param {String} val
     */
    set content(val) {
        this.shadowRoot.innerHTML = val;
    }
}
