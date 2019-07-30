/**
 * Editor Config
 */
export default class EditorConfig {
    /**
     * Creates a new instance of editor config with given defaults
     *
     * @param {Object} opts
     */
    constructor(opts = {}) {
        /**
         * URL to audio browser
         *
         * @type {?String}
         * @readonly
         */
        this.audiobrowser = opts.audiobrowser;

        /**
         * URL to block browser
         *
         * @type {?String}
         * @readonly
         */
        this.blockapi = opts.blockapi;

        /**
         * URL to block browser
         *
         * @type {?String}
         * @readonly
         */
        this.blockbrowser = opts.blockbrowser;

        /**
         * URL to iframe browser
         *
         * @type {?String}
         * @readonly
         */
        this.iframebrowser = opts.iframebrowser;

        /**
         * URL to image browser
         *
         * @type {?String}
         * @readonly
         */
        this.imagebrowser = opts.imagebrowser;

        /**
         * Language
         *
         * @type {String}
         * @readonly
         */
        this.lang = opts.lang;

        /**
         * Section
         *
         * @type {Object}
         * @readonly
         */
        this.section = opts.section;

        /**
         * URL to video browser
         *
         * @type {?String}
         * @readonly
         */
        this.videobrowser = opts.videobrowser;
    }
}
