import BoldCommand from './command/BoldCommand.js';
import Command from './command/Command.js';
import DetailsCommand from './command/DetailsCommand.js';
import HeadingCommand from './command/HeadingCommand.js';
import ItalicCommand from './command/ItalicCommand.js';
import LinkCommand from './command/LinkCommand.js';
import MediaCommand from './command/MediaCommand.js';
import OrderedListCommand from './command/OrderedListCommand.js';
import ParagraphCommand from './command/ParagraphCommand.js';
import RedoCommand from './command/RedoCommand.js';
import QuoteCommand from './command/QuoteCommand.js';
import TableCommand from './command/TableCommand.js';
import Toolbar from './ui/Toolbar.js';
import UndoCommand from './command/UndoCommand.js';
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
         * Corresponding DOM element
         *
         * @type {HTMLElement}
         * @readonly
         */
        this.element = element;

        /**
         * Correspondig DOM Document
         *
         * @type {Document}
         * @readonly
         */
        this.document = element.ownerDocument;

        /**
         * Corresponding Window object
         *
         * @type {Window}
         * @readonly
         */
        this.window = element.ownerDocument.defaultView;

        /**
         * @type {Object}
         * @readonly
         */
        this.config = config;

        /**
         * @todo Transform b => strong
         *
         * @type {string[]}
         * @readonly
         */
        this.allowed = [
            'b', 'i',
            'a',
            'li', 'ol', 'ul',
            'blockquote', 'h2', 'h3', 'p',
            'details', 'summary',
            'audio', 'figure', 'figcaption', 'iframe', 'img', 'video',
            'table', 'tbody', 'tfoot', 'td', 'th', 'thead', 'tr',
            'br',
        ];

        /**
         * Commands
         *
         * @type {Map<string, Command>}
         */
        this.commands = new Map();

        /**
         * Toolbar
         *
         * @type {Toolbar}
         * @readonly
         */
        this.toolbar = new Toolbar(this);

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
        this.document.execCommand('defaultParagraphSeparator', false, 'p');
        this.document.execCommand('enableInlineTableEditing', false, 'false');
        this.document.execCommand('enableObjectResizing', false, 'false');
    }

    /**
     * Init editor
     */
    init() {
        this.initTheme();
        this.initCommands();
        this.toolbar.init();
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
        this.commands.set('undo', new UndoCommand(this));
        this.commands.set('redo', new RedoCommand(this));
        this.commands.set('bold', new BoldCommand(this));
        this.commands.set('italic', new ItalicCommand(this));
        this.commands.set('link', new LinkCommand(this));
        this.commands.set('unlink', new UnlinkCommand(this));
        this.commands.set('paragraph', new ParagraphCommand(this));
        this.commands.set('heading2', new HeadingCommand(this, 'h2'));
        this.commands.set('heading3', new HeadingCommand(this, 'h3'));
        this.commands.set('unorderedlist', new UnorderedListCommand(this));
        this.commands.set('orderedlist', new OrderedListCommand(this));
        this.commands.set('quote', new QuoteCommand(this));
        this.commands.set('details', new DetailsCommand(this));
        this.commands.set('media', new MediaCommand(this));
        this.commands.set('table', new TableCommand(this));
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
