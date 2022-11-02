import Command from './Command.js';
import Editor from './Editor.js';
import Tag from './Tag.js';
import TagName from './TagName.js';
import { isOptString, isString } from './util.js';

export default class Plugin {
    /**
     * @type {Editor}
     */
    #editor;

    /**
     * @return {Editor}
     */
    get editor() {
        return this.#editor;
    }

    /**
     * @type {string}
     */
    static get name() {
        throw new Error('Missing name');
    }

    /**
     * @type {Plugin[]}
     */
    static get dependencies() {
        return [];
    }

    /**
     * Default configuration
     *
     * @type {Object.<string, any>}
     */
    static get config() {
        return {};
    }

    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        if (!(editor instanceof Editor)) {
            throw new TypeError('Invalid argument');
        }

        this.#editor = editor;
    }

    /**
     * @abstract
     * @return {void}
     */
    init() {
        throw new Error('Not implemented');
    }

    /**
     * Translates given string
     *
     * @protected
     * @param {string} key
     * @return {string}
     */
    _(key) {
        return this.editor.translate(key);
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
            this.editor.i18n = i18n[this.editor.config.base.lang];
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
        const l = this._(label);
        this.editor.dom.insertLastChild(this.#button(l, l, undefined, command), this.editor.toolbar);
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
        const l = this._(label);
        const alt = this._('Alt');
        const shift = this._('Shift');
        const title = l + (key ? ` [${alt} + ${shift} + ${key}]` : '');

        this.editor.dom.insertLastChild(this.#button(l, title, key, command), this.editor.formatbar);
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
        const l = this._(label);
        this.editor.dom.insertLastChild(this.#button(l, l, undefined, command), this.editor.focusbar);
    }

    /**
     * Creates a button
     *
     * @param {string} html
     * @param {string} title
     * @param {string|undefined} [key = undefined]
     * @param {string|undefined} [command = undefined]
     * @return {HTMLButtonElement}
     */
    #button(html, title, key = undefined, command = undefined) {
        if (!isString(html) || !isString(title) || !isOptString(key)) {
            throw new TypeError('Invalid argument');
        }

        return this.editor.dom.createElement(TagName.BUTTON, {
            attributes: {
                type: 'button',
                title,
                'data-command': command || this.constructor.name,
                'data-key': key,
            },
            html,
        });
    }
}
