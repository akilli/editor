import Command from './Command.js';
import Editor from './Editor.js';
import Tag from './Tag.js';
import { Error, TagName } from './enum.js';
import { isOptString, isString } from './util.js';

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
     * Translates given string with base context
     *
     * @protected
     * @param {string} key
     * @return {string}
     */
    _base(key) {
        return this.editor.translator.translate('base', key);
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
     * @param {string|undefined} [command = undefined]
     * @return {void}
     */
    _toolbar(label, command = undefined) {
        this.editor.toolbar.appendChild(this.#button(label, label, undefined, command));
    }

    /**
     * Adds a formatbar button
     *
     * @protected
     * @param {string} label
     * @param {string|undefined} [key = undefined]
     * @param {string|undefined} [command = undefined]
     * @return {void}
     */
    _formatbar(label, key = undefined, command = undefined) {
        const alt = this._base('Alt');
        const shift = this._base('Shift');
        const title = label + (key ? ` [${alt} + ${shift} + ${key}]` : '');

        this.editor.formatbar.appendChild(this.#button(label, title, key, command));
    }

    /**
     * Adds a focusbar button
     *
     * @protected
     * @param {string} label
     * @param {string|undefined} [command = undefined]
     * @return {void}
     */
    _focusbar(label, command = undefined) {
        this.editor.focusbar.appendChild(this.#button(label, label, undefined, command));
    }

    /**
     * Creates a button
     *
     * @param {string} label
     * @param {string} title
     * @param {string|undefined} [key = undefined]
     * @param {string|undefined} [command = undefined]
     * @return {HTMLButtonElement}
     */
    #button(label, title, key = undefined, command = undefined) {
        if (!isString(label) || !isString(title) || !isOptString(key)) {
            throw Error.INVALID_ARGUMENT;
        }

        return this.editor.dom.createElement(TagName.BUTTON, {
            attributes: {
                type: 'button',
                title: title,
                'data-command': command || this.constructor.name,
                'data-key': key,
            },
            html: label,
        });
    }
}
