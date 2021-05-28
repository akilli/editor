import Command from './Command.js';
import Editor from './Editor.js';
import Tag from './Tag.js';
import { Error, TagName } from './enum.js';
import { isEmptyOrString, isPopulatedString } from './util.js';

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
        throw Error.MISSING_NAME;
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
            throw Error.INVALID_ARGUMENT;
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
        throw Error.NOT_IMPLEMENTED;
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
     * Adds a toolbar button
     *
     * @protected
     * @param {string} label
     * @return {void}
     */
    _toolbar(label) {
        this.editor.toolbar.appendChild(this.#button(label));
    }

    /**
     * Adds a formatbar button
     *
     * @protected
     * @param {string} label
     * @param {string|undefined} [key = undefined]
     * @return {void}
     */
    _formatbar(label, key = undefined) {
        this.editor.formatbar.appendChild(this.#button(label, key));
    }

    /**
     * Creates a button
     *
     * @param {string} label
     * @param {string|undefined} [key = undefined]
     * @return {HTMLButtonElement}
     */
    #button(label, key = undefined) {
        if (!isPopulatedString(label) || !isEmptyOrString(key)) {
            throw Error.INVALID_ARGUMENT;
        }

        return this.editor.dom.createElement(TagName.BUTTON, {
            attributes: { type: 'button', 'data-command': this.constructor.name, title: label, 'data-key': key },
            html: label,
        });
    }
}
