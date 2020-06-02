import Command from './Command.js';
import Editor from './Editor.js';

/**
 * Plugin
 */
export default class Plugin {
    /**
     * Editor
     *
     * @type {Editor}
     */
    editor;

    /**
     * Name
     *
     * @type {String}
     */
    name;

    /**
     * Returns plugin default configuration
     *
     * @type {Object.<String, {*}>}
     */
    static get defaultConfig() {
        return {};
    }

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

        this.editor = editor;
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
        if (i18n[this.editor.config.base.lang]) {
            this.editor.i18n.set(this.name, i18n[this.editor.config.base.lang]);
        }
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
}
