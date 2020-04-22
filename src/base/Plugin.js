import Editor from './Editor.js';
import Translator from './Translator.js';

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
     * Initializes plugin
     */
    init() {
        throw 'Not implemented';
    }

    /**
     * Registers a translator for this plugin
     *
     * @param {Object.<String, Object.<String, String>>} i18n
     */
    registerTranslator(i18n) {
        this.editor.translators.set(new Translator(this.name, i18n[this.editor.config.base.lang] || {}));
    }

    /**
     * Returns plugin default configuration
     *
     * @return {Object}
     */
    static defaultConfig() {
        return {};
    }
}
