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
     * @type {string}
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
     * @type {Object.<string, any>}
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
     * @return {void}
     */
    init() {
        throw 'Not implemented';
    }

    /**
     * Translates given string
     *
     * @protected
     * @param {string} key
     * @return {string}
     */
    _(key) {
        return this.editor.translator.translate(this.constructor.name, key);
    }

    /**
     * Registers i18n data for this plugin
     *
     * @protected
     * @param {Object.<string, Object.<string, string>>} i18n
     * @return {void}
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
     * @param {string} tagName
     * @return {void}
     */
    _command(tagName) {
        this.editor.commands.set(new Command(this.editor, this.constructor.name, tagName));
    }

    /**
     * Creates and registers a tag with given options
     *
     * @protected
     * @param {Object} opts
     * @return {void}
     */
    _tag(opts) {
        this.editor.tags.set(new Tag(opts));
    }

    /**
     * Creates a toolbar button
     *
     * @protected
     * @param {string} label
     * @param {?string} [key = null]
     * @param {boolean} [format = false]
     * @return {void}
     */
    _toolbar(label, key = null, format = false) {
        if (!label || typeof label !== 'string' || key && typeof key !== 'string') {
            throw 'Invalid argument';
        }

        const translatedLabel = this._(label);
        const button = this.editor.dom.createElement('button', {
            attributes: {
                type: 'button',
                'data-command': this.constructor.name,
                title: translatedLabel,
                'data-key': key,
            },
            html: translatedLabel,
        });

        format ? this.editor.formats.appendChild(button) : this.editor.toolbar.appendChild(button);
    }
}
