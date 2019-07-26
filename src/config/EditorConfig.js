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
         * URL to media browser
         *
         * @type {?String}
         */
        this.mediabrowser = opts.mediabrowser || null;
    }
}
