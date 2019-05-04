/**
 * Editor Config
 */
export default class EditorConfig {
    /**
     * Creates a new instance of editor config with given defaults
     *
     * @param {Object} opt
     */
    constructor(opt = {}) {
        /**
         * URL path to `gui` directory
         *
         * @type {String}
         */
        this.gui = opt.gui || '/editor/gui';

        /**
         * URL to media browser
         *
         * @type {?String}
         */
        this.mediabrowser = opt.mediabrowser || null;
    }
}
