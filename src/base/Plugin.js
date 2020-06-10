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
    static get name() {
        throw 'Missing plugin name';
    }

    /**
     * Dependencies
     *
     * @type {Plugin[]}
     */
    static get dependencies() {
        return [];
    }

    /**
     * Returns plugin default configuration
     *
     * @type {Object.<String, {*}>}
     */
    static get config() {
        return {};
    }

    /**
     * Initializes a new plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        if (!(editor instanceof Editor)) {
            throw 'Invalid argument';
        }

        this.editor = editor;
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
    _translator(i18n) {
        if (i18n[this.editor.config.base.lang]) {
            this.editor.i18n.set(this.constructor.name, i18n[this.editor.config.base.lang]);
        }
    }
}
