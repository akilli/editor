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
         * Media
         *
         * @type {Object}
         * @readonly
         */
        this.media = opts.media || {};
    }
}
