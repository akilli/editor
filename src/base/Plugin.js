import Editor from './Editor.js';

/**
 * Plugin
 */
export default class Plugin {
    /**
     * Initializes a new plugin with given name
     *
     * @param {Editor} editor
     * @param {String} name
     */
    constructor(editor, name) {
        if (!(editor instanceof Editor) || !name || typeof name !== 'string') {
            throw 'Invalid argument';
        } else if (this.config()) {
            editor.config[name] = Object.assign({}, this.config(), editor.config[name] || {});
        }

        /**
         * Editor
         *
         * @type {Editor}
         * @readonly
         */
        this.editor = editor;

        /**
         * Name
         *
         * @type {String}
         * @readonly
         */
        this.name = name;
    }

    /**
     * Returns default configuration of the plugin if any
     *
     * @return {?Object}
     */
    config() {
        return null;
    }

    /**
     * Initializes plugin
     */
    init() {
        throw 'Not implemented';
    }
}
