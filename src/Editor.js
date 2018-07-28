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
import SubheadingCommand from './command/SubheadingCommand.js';
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
         * Tag configuration
         *
         * @type {Object}
         * @readonly
         */
        this.tags = {
            a: {
                group: 'inline',
                allowed: ['b', 'i'],
            },
            audio: {
                group: 'block',
                allowed: []
            },
            b: {
                group: 'inline',
                allowed: ['a', 'i'],
            },
            blockquote: {
                group: 'block',
                allowed: ['p'],
            },
            br: {
                group: 'inline',
                allowed: [],
            },
            details: {
                group: 'block',
                allowed: ['figure', 'p', 'summary', 'table']
            },
            figcaption: {
                group: 'block',
                allowed: ['a', 'b', 'i'],
            },
            figure: {
                group: 'block',
                allowed: ['audio', 'blockquote', 'figcaption', 'iframe', 'img', 'table', 'video'],
            },
            h2: {
                group: 'block',
                allowed: [],
            },
            h3: {
                group: 'block',
                allowed: [],
            },
            i: {
                group: 'inline',
                allowed: ['a', 'b'],
            },
            iframe: {
                group: 'block',
                allowed: []
            },
            img: {
                group: 'block',
                allowed: []
            },
            li: {
                group: 'block',
                allowed: ['a', 'b', 'i'],
            },
            ol: {
                group: 'block',
                allowed: ['li'],
            },
            p: {
                group: 'block',
                allowed: [],
            },
            summary: {
                group: 'block',
                allowed: []
            },
            table: {
                group: 'block',
                allowed: ['tbody', 'tfoot', 'thead']
            },
            tbody: {
                group: 'block',
                allowed: ['tr']
            },
            td: {
                group: 'block',
                allowed: ['a', 'b', 'i']
            },
            tfoot: {
                group: 'block',
                allowed: ['tr']
            },
            th: {
                group: 'block',
                allowed: ['a', 'b', 'i']
            },
            thead: {
                group: 'block',
                allowed: ['tr']
            },
            tr: {
                group: 'block',
                allowed: ['td', 'th']
            },
            ul: {
                group: 'block',
                allowed: ['li'],
            },
            video: {
                group: 'block',
                allowed: []
            },
        };

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
        this.commands.set('heading', new HeadingCommand(this));
        this.commands.set('subheading', new SubheadingCommand(this));
        this.commands.set('unorderedlist', new UnorderedListCommand(this));
        this.commands.set('orderedlist', new OrderedListCommand(this));
        this.commands.set('quote', new QuoteCommand(this));
        this.commands.set('media', new MediaCommand(this));
        this.commands.set('table', new TableCommand(this));
        this.commands.set('details', new DetailsCommand(this));
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
     * Converts URL
     *
     * @param {string} url
     *
     * @return {string}
     */
    url(url) {
        const a = this.document.createElement('a');
        a.href = url;

        return a.origin === this.window.origin ? a.pathname : a.href;
    }

    /**
     * Returns theme URL
     *
     * @param {string} path
     *
     * @return {string}
     */
    theme(path) {
        return this.config.path + '/theme/' + path;
    }

    /**
     * Returns icon URL
     *
     * @param {string} name
     *
     * @return {string}
     */
    icon(name) {
        return this.theme('icon/' + name + '.svg');
    }

    /**
     * Filter HTML
     *
     * @param {string} html
     *
     * @return {string}
     */
    filter(html) {
        const tmp = this.document.createElement('div');
        const treeWalker = this.document.createTreeWalker(tmp);
        let node;

        tmp.innerHTML = html;

        while (treeWalker.nextNode()) {
            node = treeWalker.currentNode;

            if (node.nodeType === Node.TEXT_NODE && node.parentNode === treeWalker.root) {
                const p = this.document.createElement('p');
                p.innerText = node.nodeValue;
                node.parentNode.replaceChild(p, node);
            }
        }

        return this.clean(Editor.trim(Editor.strip(Editor.decode(tmp.innerHTML), Object.getOwnPropertyNames(this.tags))));
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
        tmp.querySelectorAll('[style]').forEach(item => item.removeAttribute('style'));

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
