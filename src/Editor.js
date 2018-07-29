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
            _root_: {
                group: 'root',
                empty: false,
                attributes: [],
                allowed: ['details', 'figure', 'h2', 'h3', 'ol', 'p', 'ul'],
            },
            a: {
                group: 'inline',
                empty: false,
                attributes: ['href'],
                allowed: ['b', 'i'],
            },
            audio: {
                group: 'media',
                empty: false,
                attributes: ['controls', 'height', 'src', 'width'],
                allowed: [],
            },
            b: {
                group: 'inline',
                empty: false,
                attributes: [],
                allowed: ['a', 'i'],
            },
            blockquote: {
                group: 'block',
                empty: false,
                attributes: [],
                allowed: ['p'],
            },
            br: {
                group: 'break',
                empty: true,
                attributes: [],
                allowed: [],
            },
            details: {
                group: 'block',
                empty: false,
                attributes: [],
                allowed: ['figure', 'p', 'summary', 'table'],
            },
            figcaption: {
                group: 'block',
                empty: false,
                attributes: [],
                allowed: ['a', 'b', 'i'],
            },
            figure: {
                group: 'block',
                empty: false,
                attributes: ['class'],
                allowed: ['audio', 'blockquote', 'figcaption', 'iframe', 'img', 'table', 'video'],
            },
            h2: {
                group: 'block',
                empty: false,
                attributes: [],
                allowed: [],
            },
            h3: {
                group: 'block',
                empty: false,
                attributes: [],
                allowed: [],
            },
            i: {
                group: 'inline',
                empty: false,
                attributes: [],
                allowed: ['a', 'b'],
            },
            iframe: {
                group: 'media',
                empty: false,
                attributes: ['allowfullscreen', 'height', 'src', 'width'],
                allowed: [],
            },
            img: {
                group: 'media',
                empty: true,
                attributes: ['alt', 'height', 'src', 'width'],
                allowed: [],
            },
            li: {
                group: 'block',
                empty: false,
                attributes: [],
                allowed: ['a', 'b', 'br', 'i'],
            },
            ol: {
                group: 'block',
                empty: false,
                attributes: [],
                allowed: ['li'],
            },
            p: {
                group: 'block',
                empty: false,
                attributes: [],
                allowed: ['a', 'b', 'br', 'i'],
            },
            summary: {
                group: 'block',
                empty: false,
                attributes: [],
                allowed: [],
            },
            table: {
                group: 'block',
                empty: false,
                attributes: [],
                allowed: ['tbody', 'tfoot', 'thead'],
            },
            tbody: {
                group: 'block',
                empty: false,
                attributes: [],
                allowed: ['tr'],
            },
            td: {
                group: 'block',
                empty: false,
                attributes: [],
                allowed: ['a', 'b', 'br', 'i'],
            },
            tfoot: {
                group: 'block',
                empty: false,
                attributes: [],
                allowed: ['tr'],
            },
            th: {
                group: 'block',
                empty: false,
                attributes: [],
                allowed: ['a', 'b', 'br', 'i'],
            },
            thead: {
                group: 'block',
                empty: false,
                attributes: [],
                allowed: ['tr'],
            },
            tr: {
                group: 'block',
                empty: false,
                attributes: [],
                allowed: ['td', 'th'],
            },
            ul: {
                group: 'block',
                empty: false,
                attributes: [],
                allowed: ['li'],
            },
            video: {
                group: 'media',
                empty: false,
                attributes: ['controls', 'height', 'src', 'width'],
                allowed: [],
            },
        };

        /**
         * Element mapping
         *
         * @type {Object}
         */
        this.mapping = {
            abbr: null,
            cite: null,
            code: null,
            data: null,
            dfn: null,
            div: 'p',
            em: 'i',
            kbd: null,
            mark: null,
            q: null,
            s: null,
            small: null,
            span: null,
            strong: 'b',
            sub: null,
            sup: null,
            time: null,
            u: null,
            var: null,
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
    }

    /**
     * Init editor
     */
    init() {
        this.initElement();
        this.initTheme();
        this.initCommands();
        this.toolbar.init();
    }

    /**
     * Init element
     */
    initElement() {
        let html = this.element.innerHTML;

        if (this.element instanceof HTMLTextAreaElement) {
            const element = this.element;
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
        this.execute('enableInlineTableEditing', 'false');
        this.execute('enableObjectResizing', 'false');
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
     *
     * @param {HTMLElement} el
     * @param {boolean} first
     */
    insert(el, first = false) {
        if (!(el instanceof HTMLElement)) {
            throw 'No HTML element';
        }

        if (first && !!this.element.firstElementChild) {
            this.element.insertBefore(el, this.element.firstElementChild);
        } else {
            this.element.appendChild(el);
        }
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
        tmp.innerHTML = Editor.decode(html);
        tmp.querySelectorAll(Object.getOwnPropertyNames(this.mapping).join(', ')).forEach(item => {
            const name = this.mapping[item.tagName.toLowerCase()];
            let newNode;

            if (name) {
                newNode = this.document.createElement(name);
                newNode.innerHTML = item.innerHTML;
            } else {
                newNode = this.document.createTextNode(item.innerText.trim());
            }

            item.parentNode.replaceChild(newNode, item);
        });
        this.walk(tmp);

        return Editor.trim(tmp.innerHTML);
    }

    /**
     * Tree traversal
     *
     * @param {HTMLElement} parent
     */
    walk(parent) {
        if (!(parent instanceof HTMLElement)) {
            throw 'No HTML element';
        }

        const isTop = !parent.parentNode;
        const parentCfg = isTop ? this.tags._root_ : this.tags[parent.tagName.toLowerCase()];

        Array.from(parent.childNodes).forEach(node => {
            const tag = node.nodeName.toLowerCase();
            const cfg = node.nodeType === Node.ELEMENT_NODE && !!this.tags[tag] ? this.tags[tag] : null;

            if (cfg && (parentCfg.allowed.includes(tag) || isTop && cfg.group === 'inline')) {
                Array.from(node.attributes).forEach(item => {
                    if (!cfg.attributes.includes(item.name)) {
                        node.removeAttribute(item.name);
                    }
                });

                if (node.hasChildNodes()) {
                    this.walk(node);
                }

                if (!node.hasChildNodes() && !cfg.empty || cfg.group === 'break' && (node === parent.firstElementChild || node === parent.lastElementChild)) {
                    parent.removeChild(node);
                } else if (isTop && cfg.group === 'inline') {
                    const p = this.document.createElement('p');
                    p.innerHTML = node.outerHTML;
                    parent.replaceChild(p, node);
                }
            } else if (isTop && (node.nodeType === Node.TEXT_NODE && !!node.nodeValue.trim() || cfg && !!node.innerText.trim())) {
                const p = this.document.createElement('p');
                p.innerText = node.nodeType === Node.TEXT_NODE ? node.nodeValue.trim() : node.innerText.trim();
                parent.replaceChild(p, node);
            } else if (cfg && !!node.innerText.trim()) {
                const text = this.document.createTextNode(node.innerText.trim());
                parent.replaceChild(text, node);
            } else if (node.nodeType !== Node.TEXT_NODE || isTop) {
                parent.removeChild(node);
            }
        });
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
