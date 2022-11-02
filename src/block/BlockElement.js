export default class BlockElement extends HTMLElement {
    /**
     * @return {string}
     */
    get content() {
        return this.shadowRoot.innerHTML;
    }

    /**
     * @param {string} val
     * @return {void}
     */
    set content(val) {
        this.shadowRoot.innerHTML = val;
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
}
