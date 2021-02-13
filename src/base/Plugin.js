import Command from './Command.js';
import Editor from './Editor.js';
import Tag from './Tag.js';

/**
 * Plugin
 */
export default class Plugin {
    /**
     * Editor
     *
     * @type {Editor}
     */
    #editor;

    /**
     * Allows read access to editor
     *
     * @return {Editor}
     */
    get editor() {
        return this.#editor;
    }

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

        this.#editor = editor;
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
     * Translates given string
     *
     * @protected
     * @param {String} key
     * @return {String}
     */
    _(key) {
        return this.editor.translator.translate(this.constructor.name, key);
    }

    /**
     * Registers i18n data for this plugin
     *
     * @protected
     * @param {Object.<String, Object.<String, String>>} i18n
     */
    _i18n(i18n) {
        if (i18n[this.editor.config.base.lang]) {
            this.editor.translator.set(this.constructor.name, i18n[this.editor.config.base.lang]);
        }
    }

    /**
     * Registers a command with given parameters
     *
     * @protected
     * @param {String} tagName
     */
    _command(tagName) {
        this.editor.commands.set(new Command(this.editor, this.constructor.name, tagName));
    }

    /**
     * Creates and registers a tag with given options
     *
     * @protected
     * @param {Object} opts
     */
    _tag(opts) {
        this.editor.tags.set(new Tag(opts));
    }

    /**
     * Creates a toolbar button
     *
     * @protected
     * @param {String} label
     * @param {?String} [key = null]
     * @param {Boolean} [format = false]
     */
    _toolbar(label, key = null, format = false) {
        if (!label || typeof label !== 'string' || key && typeof key !== 'string') {
            throw 'Invalid argument';
        }

        label = this._(label);
        const button = this.editor.createElement('button', {
            attributes: {type: 'button', 'data-command': this.constructor.name, title: label, 'data-key': key},
            html: label,
        });

        format ? this.editor.formats.appendChild(button) : this.editor.toolbar.appendChild(button);
    }
}
