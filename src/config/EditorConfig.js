/**
 * Editor Config
 */
export default class EditorConfig {
    /**
     * Creates a new instance of editor config with given defaults
     *
     * @param {Object} [opts = {}]
     */
    constructor(opts = {}) {
        /**
         * Block
         *
         * @type {Object}
         * @readonly
         */
        this.block = opts.block || {};

        /**
         * Language
         *
         * @type {String}
         * @readonly
         */
        this.lang = opts.lang;

        /**
         * Media
         *
         * @type {Object}
         * @readonly
         */
        this.media = opts.media || {};

        /**
         * Section
         *
         * @type {Object}
         * @readonly
         */
        this.section = opts.section || {};
    }
}
