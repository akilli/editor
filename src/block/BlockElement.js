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
        this._content = null;
        this._css = null;
    }

    /**
     * Sets block content
     *
     * @param {?String} val
     */
    set content(val) {
        this._content = val;
        this._updateHtml();
    }

    /**
     * Sets block style sheet
     *
     * @param {?String} val
     */
    set css(val) {
        this._css = val;
        this._updateHtml();
    }

    /**
     *
     * @private
     */
    _updateHtml() {
        const css = this._css ? this._css.split(',').map(item => `<link rel="stylesheet" href="${item}">`).join('') : '';
        this.shadowRoot.innerHTML = css + this._content;
        console.log(css + this._content);
    }
}
