import ClearCommand from '../src/command/clearcommand.js';
import Command from './command/command.js';
import HeadingCommand from '../src/command/headingcommand.js';
import ImageCommand from '../src/command/imagecommand.js';
import LinkCommand from '../src/command/linkcommand.js';
import OrderedListCommand from '../src/command/orderedlistcommand.js';
import ParagraphCommand from '../src/command/paragraphcommand.js';
import QuoteCommand from '../src/command/quotecommand.js';
import SimpleCommand from '../src/command/simplecommand.js';
import UnlinkCommand from '../src/command/unlinkcommand.js';
import UnorderedListCommand from '../src/command/unorderedlistcommand.js';

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
        this.allowed = ['a', 'blockquote', 'br', 'h2', 'h3', 'i', 'img', 'li', 'ol', 'p', 'strong', 'u', 'ul'];

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
        this.initCommands();
        this.initToolbar();
    }

    /**
     * Init commands
     */
    initCommands() {
        this.commands.set('bold', new SimpleCommand(this, 'strong'));
        this.commands.set('italic', new SimpleCommand(this, 'i'));
        this.commands.set('clear', new ClearCommand(this));
        this.commands.set('link', new LinkCommand(this));
        this.commands.set('unlink', new UnlinkCommand(this));
        this.commands.set('unorderedlist', new UnorderedListCommand(this));
        this.commands.set('orderedlist', new OrderedListCommand(this));
        this.commands.set('paragraph', new ParagraphCommand(this));
        this.commands.set('h2', new HeadingCommand(this, 'h2'));
        this.commands.set('h3', new HeadingCommand(this, 'h3'));
        this.commands.set('quote', new QuoteCommand(this));
        this.commands.set('image', new ImageCommand(this));
    }

    /**
     * Init toolbar
     */
    initToolbar() {
        const toolbar = this.document.createElement('div');

        for (let item of this.commands) {
            const img = this.document.createElement('img');

            img.setAttribute('src', Editor.icon(item[0]));
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
        return this.filter(this.element.innerHTML);
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
     * Filter HTML
     *
     * @param {string} html
     *
     * @return {string}
     */
    filter(html) {
        return html
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'")
            .replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, ($0, $1) => this.allowed.includes($1.toLowerCase()) ? $0 : '')
            .trim()
            .replace(/&nbsp;/g, ' ')
            .replace(/\s+/g, ' ')
            .replace(/^(<br\s*\/?>)+/gi, ' ')
            .replace(/(<br\s*\/?>)+$/gi, ' ')
            .trim();
    }

    /**
     * Returns icon URL for given command
     *
     * @param {string} command
     *
     * @return {string}
     */
    static icon(command) {
        return '/src/theme/icon/' + command + '.svg';
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
