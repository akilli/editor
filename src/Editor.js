import BoldCommand from './command/BoldCommand.js';
import ClearCommand from './command/ClearCommand.js';
import Command from './command/Command.js';
import DetailsCommand from './command/DetailsCommand.js';
import HeadingCommand from './command/HeadingCommand.js';
import ItalicCommand from './command/ItalicCommand.js';
import LinkCommand from './command/LinkCommand.js';
import MediaCommand from './command/MediaCommand.js';
import OrderedListCommand from './command/OrderedListCommand.js';
import ParagraphCommand from './command/ParagraphCommand.js';
import QuoteCommand from './command/QuoteCommand.js';
import UnlinkCommand from './command/UnlinkCommand.js';
import UnorderedListCommand from './command/UnorderedListCommand.js';

/**
 * Editor
 */
export default class Editor {
    /**
     * Creates a new instance of editor with given configuration
     *
     * @param {HTMLElement} element
     * @param {Object} config
     */
    constructor(element, config = {}) {
        if (!(element instanceof HTMLElement)) {
            throw 'Invalid element';
        }

        /**
         * @type {Object}
         * @readonly
         */
        this.config = config;

        /**
         * @type {string[]}
         * @readonly
         */
        this.allowed = ['a', 'b', 'blockquote', 'br', 'details', 'h2', 'h3', 'i', 'img', 'li', 'ol', 'p', 'summary', 'ul'];

        /**
         * Editor commands
         *
         * @type {Map<string, Command>}
         */
        this.commands = new Map();

        /**
         * @type {HTMLElement}
         * @readonly
         */
        this.element = element;

        /**
         * @type {Document}
         * @readonly
         */
        this.document = element.ownerDocument;

        /**
         * @type {Window}
         * @readonly
         */
        this.window = element.ownerDocument.defaultView;

        let html = this.element.innerHTML;

        if (element instanceof HTMLTextAreaElement) {
            this.element = this.document.createElement('div');
            html = element.value;
            element.parentNode.insertBefore(this.element, element);
            element.setAttribute('hidden', 'hidden');
            element.form.addEventListener('submit', () => {
                element.value = this.getData();
            });
        }

        this.setData(html);
        this.element.classList.add('editor');
        this.element.setAttribute('contenteditable', 'true');
    }

    /**
     * Init editor
     */
    init() {
        this.initTheme();
        this.initCommands();
        this.initToolbar();
    }

    /**
     * Init theme
     */
    initTheme() {
        const css = this.document.styleSheets;
        const link = this.document.createElement('link');

        link.rel = 'stylesheet';
        link.href = this.theme('editor.css');

        for (let i = 0; i < css.length; ++i) {
            if (css[i].href === link.href) {
                return;
            }
        }

        this.document.head.appendChild(link);
    }

    /**
     * Init commands
     */
    initCommands() {
        this.execute('defaultParagraphSeparator', 'p');
        this.execute('enableObjectResizing', false);
        this.commands.set('bold', new BoldCommand(this));
        this.commands.set('italic', new ItalicCommand(this));
        this.commands.set('clear', new ClearCommand(this));
        this.commands.set('link', new LinkCommand(this));
        this.commands.set('unlink', new UnlinkCommand(this));
        this.commands.set('unorderedlist', new UnorderedListCommand(this));
        this.commands.set('orderedlist', new OrderedListCommand(this));
        this.commands.set('paragraph', new ParagraphCommand(this));
        this.commands.set('h2', new HeadingCommand(this, 'h2'));
        this.commands.set('h3', new HeadingCommand(this, 'h3'));
        this.commands.set('quote', new QuoteCommand(this));
        this.commands.set('details', new DetailsCommand(this));
        this.commands.set('media', new MediaCommand(this));
    }

    /**
     * Init toolbar
     */
    initToolbar() {
        const toolbar = this.document.createElement('div');

        for (let item of this.commands) {
            const img = this.document.createElement('img');

            img.setAttribute('src', this.icon(item[0]));
            img.setAttribute('alt', item[0]);
            img.setAttribute('title', item[0]);
            img.addEventListener('click', () => {
                if (this.window.getSelection().containsNode(this.element, true)) {
                    item[1].execute();
                }
            });
            toolbar.appendChild(img);
        }

        toolbar.classList.add('editor-toolbar');
        this.element.parentNode.insertBefore(toolbar, this.element);
    }

    /**
     * Returns editor element's innerHTML
     *
     * @return {string}
     */
    getData() {
        this.element.innerHTML = this.filter(this.element.innerHTML);

        return this.element.innerHTML;
    }

    /**
     * Sets editor element's innerHTML
     *
     * @param {string} html
     */
    setData(html) {
        this.element.innerHTML = this.filter(html);
    }

    /**
     * Execute command
     *
     * @param {string} command
     * @param {?string} value
     */
    execute(command, value = null) {
        this.document.execCommand(command, false, value);
    }

    /**
     * Returns theme URL
     *
     * @param {string} path
     *
     * @return {string}
     */
    theme(path) {
        return this.config.path + 'theme/' + path;
    }

    /**
     * Returns icon URL
     *
     * @param {string} name
     *
     * @return {string}
     */
    icon(name) {
        return this.config.path + 'theme/icon/' + name + '.svg';
    }

    /**
     * Filter HTML
     *
     * @param {string} html
     *
     * @return {string}
     */
    filter(html) {
        return this.clean(Editor.trim(Editor.strip(Editor.decode(html), this.allowed)));
    }

    /**
     * Clean HTML
     *
     * @param {string} html
     *
     * @return {string}
     */
    clean(html) {
        const tmp = this.document.createElement('div');

        tmp.innerHTML = html;
        tmp.querySelectorAll('br:first-child').forEach(item => item.parentNode.removeChild(item));
        tmp.querySelectorAll('br:last-child').forEach(item => item.parentNode.removeChild(item));
        tmp.querySelectorAll(':scope > br').forEach(item => item.parentNode.removeChild(item));
        tmp.querySelectorAll('p:empty').forEach(item => item.parentNode.removeChild(item));

        return tmp.innerHTML;
    }

    /**
     * Encode HTML
     *
     * @param {string} html
     *
     * @return {string}
     */
    static encode(html) {
        return html
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    /**
     * Decode HTML
     *
     * @param {string} html
     *
     * @return {string}
     */
    static decode(html) {
        return html
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'");
    }

    /**
     * Strip disallowed HTML elements
     *
     * @param {string} html
     * @param {string[]} allowed
     *
     * @return {string}
     */
    static strip(html, allowed) {
        return html.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, ($0, $1) => allowed.includes($1.toLowerCase()) ? $0 : '');
    }

    /**
     * Trim HTML
     *
     * @param {string} html
     *
     * @return {string}
     */
    static trim(html) {
        return html
            .trim()
            .replace(/&nbsp;/g, ' ')
            .replace(/\s+/g, ' ')
            .replace(/^(<br\s*\/?>)+/gi, ' ')
            .replace(/(<br\s*\/?>)+$/gi, ' ')
            .trim();
    }

    /**
     * Factory method to create a new instance of editor with given configuration
     *
     * @param {HTMLElement} element
     * @param {Object} config
     *
     * @return {Editor}
     */
    static create(element, config = {}) {
        const editor = new Editor(element, config);
        editor.init();

        return editor;
    }
}
