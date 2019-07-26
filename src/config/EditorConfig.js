/**
 * Editor Config
 */
export default class EditorConfig {
    /**
     * Creates a new instance of editor config with given defaults
     *
     * @param {Object} opts
     */
    constructor({blockapi = null, blockbrowser = null, lang = 'en', mediabrowser = null, section = {}} = {}) {
        /**
         * URL to block browser
         *
         * @type {?String}
         * @readonly
         */
        this.blockapi = blockapi;

        /**
         * URL to block browser
         *
         * @type {?String}
         * @readonly
         */
        this.blockbrowser = blockbrowser;

        /**
         * Language
         *
         * @type {String}
         * @readonly
         */
        this.lang = lang;

        /**
         * URL to media browser
         *
         * @type {?String}
         * @readonly
         */
        this.mediabrowser = mediabrowser;

        /**
         * Section
         *
         * @type {Object}
         * @readonly
         */
        this.section = section;
    }
}
