/**
 * Editor Config
 */
export default class Config {
    /**
     * Creates a new instance of editor config with given defaults
     *
     * @param {Object} [opts = {}]
     */
    constructor(opts = {}) {
        /**
         * Language
         *
         * @type {String}
         * @readonly
         */
        this.lang = opts.lang || 'en';

        /**
         * Audio
         *
         * @type {Object}
         * @readonly
         */
        this.audio = opts.audio || {};

        /**
         * Iframe
         *
         * @type {Object}
         * @readonly
         */
        this.iframe = opts.iframe || {};

        /**
         * Image
         *
         * @type {Object}
         * @readonly
         */
        this.image = opts.image || {};

        /**
         * Video
         *
         * @type {Object}
         * @readonly
         */
        this.video = opts.video || {};
    }
}
