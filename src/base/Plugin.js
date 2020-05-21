import Command from './Command.js';
import Editor from './Editor.js';
import Translator from './Translator.js';
import Tag from './Tag.js';

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
         */
        this.editor = editor;

        /**
         * Name
         *
         * @type {String}
         */
        this.name = name;
    }

    /**
     * Initializes plugin
     *
     * @abstract
     */
    init() {
        throw 'Not implemented';
    }

    /**
     * Registers a translator for this plugin
     *
     * @protected
     * @param {Object.<String, Object.<String, String>>} i18n
     */
    registerTranslator(i18n) {
        this.editor.translators.set(new Translator(this.name, i18n[this.editor.config.base.lang] || {}));
    }

    /**
     * Registers a tag with given parameters
     *
     * @protected
     * @param {Object} params
     */
    registerTag(params) {
        this.editor.tags.set(new Tag(params));
    }

    /**
     * Registers a command with given parameters
     *
     * @protected
     * @param {String} name
     * @param {?String} tagName
     */
    registerCommand(name, tagName = null) {
        this.editor.commands.set(new Command(this.editor, name, tagName));
    }

    /**
     * Returns plugin default configuration
     *
     * @return {Object.<String, {*}>}
     */
    static defaultConfig() {
        return {};
    }
}
