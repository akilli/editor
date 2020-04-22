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

        /**
         * Block content
         *
         * @type {String}
         */
        this._content = '';
    }

    /**
     * Called when an observed attribute has been added, removed, updated, or replaced
     *
     * @see observedAttributes()
     *
     * @param {String} name
     * @param {String} oldValue
     * @param {String} newValue
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'id') {
            this._setContent();
        } else if (name === 'css') {
            this._update();
        }
    }

    /**
     * Observed attributes
     *
     * @return {String[]}
     */
    static get observedAttributes() {
        return ['css', 'id'];
    }

    /**
     * API getter
     *
     * @return {?String}
     */
    get api() {
        return this.getAttribute('api');
    }

    /**
     * API setter
     *
     * @param {String} val
     */
    set api(val) {
        this.setAttribute('api', val);
    }

    /**
     * CSS getter
     *
     * @return {?String}
     */
    get css() {
        return this.getAttribute('css');
    }

    /**
     * CSS setter
     *
     * @param {String} val
     */
    set css(val) {
        this.setAttribute('css', val);
    }

    /**
     * Updates shadow root HTML
     *
     * @private
     */
    _update() {
        this.shadowRoot.innerHTML = this._getCss() + this._content;
    }

    /**
     * Returns HTML for stylesheets
     *
     * @private
     *
     * @return {String}
     */
    _getCss() {
        return this.css ? this.css.split(',').map(item => `<link rel="stylesheet" href="${item}">`).join('') : '';
    }

    /**
     * Sets block content from API
     *
     * @private
     */
    async _setContent() {
        if (this.api && this.id) {
            try {
                const response = await fetch(this.api.replace('{id}', this.id), {mode: 'no-cors'});

                if (response.ok) {
                    this._content = await response.text();
                    this._update();
                }
            } catch (e) {
                console.error(e);
            }
        }

        this._content = '';
    }
}
