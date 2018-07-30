import BoldCommand from './command/BoldCommand.js';
import Command from './command/Command.js';
import DetailsCommand from './command/DetailsCommand.js';
import HeadingCommand from './command/HeadingCommand.js';
import ItalicCommand from './command/ItalicCommand.js';
import LinkCommand from './command/LinkCommand.js';
import ListCommand from './command/ListCommand.js';
import MediaCommand from './command/MediaCommand.js';
import ParagraphCommand from './command/ParagraphCommand.js';
import RedoCommand from './command/RedoCommand.js';
import QuoteCommand from './command/QuoteCommand.js';
import TableCommand from './command/TableCommand.js';
import Toolbar from './ui/Toolbar.js';
import UndoCommand from './command/UndoCommand.js';
import UnlinkCommand from './command/UnlinkCommand.js';

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
                group: 'text',
                empty: false,
                attributes: ['href'],
                allowed: [],
            },
            audio: {
                group: 'media',
                empty: false,
                attributes: ['controls', 'height', 'src', 'width'],
                allowed: [],
            },
            b: {
                group: 'text',
                empty: false,
                attributes: [],
                allowed: [],
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
                group: 'text',
                empty: false,
                attributes: [],
                allowed: [],
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
         * Element converters
         *
         * @type {Object}
         */
        this.converters = {
            abbr: '_text_',
            cite: '_text_',
            code: '_text_',
            data: '_text_',
            dfn: '_text_',
            div: 'p',
            em: 'i',
            ins: '_text_',
            kbd: '_text_',
            mark: '_text_',
            q: '_text_',
            s: '_text_',
            small: '_text_',
            span: '_text_',
            strong: 'b',
            sub: '_text_',
            sup: '_text_',
            time: '_text_',
            u: '_text_',
            var: '_text_',
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

        this.element.innerHTML = this.filterHtml(html);
        this.element.classList.add('editor');
        Array.from(this.element.children).forEach(node => {
            if (this.allowed(node.tagName, '_root_')) {
                node.setAttribute('contenteditable', 'true');
            }
        });
        this.register(ev => {
            ev.forEach(item => {
                item.addedNodes.forEach(node => {
                    if (node instanceof HTMLElement && node.parentNode === this.element && this.allowed(node.tagName, '_root_')) {
                        node.setAttribute('contenteditable', 'true');
                    }
                });
            });
        }, {childList: true});
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
        this.commands.set('heading', new HeadingCommand(this, 'h2'));
        this.commands.set('subheading', new HeadingCommand(this, 'h3'));
        this.commands.set('unorderedlist', new ListCommand(this, 'ul'));
        this.commands.set('orderedlist', new ListCommand(this, 'ol'));
        this.commands.set('quote', new QuoteCommand(this));
        this.commands.set('media', new MediaCommand(this));
        this.commands.set('table', new TableCommand(this));
        this.commands.set('details', new DetailsCommand(this));
    }

    /**
     * Short-cut method to register a mutation observer
     *
     * @param {function} callback
     * @param {Object} cfg
     */
    register(callback, cfg) {
        if (typeof callback !== 'function' || !cfg) {
            throw 'Invalid observer';
        }

        const mutation = new MutationObserver(callback);
        mutation.observe(this.element, cfg);
    }

    /**
     * Returns editor element's innerHTML
     *
     * @return {string}
     */
    getData() {
        this.element.innerHTML = this.filterHtml(this.element.innerHTML);

        return this.element.innerHTML;
    }

    /**
     * Insert an element
     *
     * @param {HTMLElement} el
     * @param {?HTMLElement} parent
     */
    insert(el, parent = null) {
        if (!(el instanceof HTMLElement) || !!parent && !(parent instanceof HTMLElement)) {
            throw 'Invalid HTML element';
        } else if (!parent) {
            parent = this.element;
        }

        parent.appendChild(el);
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
     * Filters HTML
     *
     * @param {string} html
     *
     * @return {string}
     */
    filterHtml(html) {
        const tmp = this.document.createElement('div');
        tmp.innerHTML = this.decode(html);
        this.filterElement(tmp);

        return tmp.innerHTML;
    }

    /**
     * Filters element
     *
     * @param {HTMLElement} parent
     */
    filterElement(parent) {
        if (!(parent instanceof HTMLElement)) {
            throw 'No HTML element';
        }

        const isTop = !parent.parentNode;
        const parentTag = isTop ? '_root_' : parent.tagName;
        let br;

        Array.from(parent.childNodes).forEach(node => {
            let tag = null;
            let conv = null;
            let cfg = null;

            if (node instanceof HTMLElement) {
                tag = node.tagName;

                if (conv = this.getConverter(tag)) {
                    const oldNode = node;

                    if (conv !== '_text_' && (node = this.document.createElement(conv)) && node instanceof HTMLElement) {
                        node.innerHTML = oldNode.innerHTML;
                        tag = node.tagName;
                    } else {
                        node = this.document.createTextNode(oldNode.innerText.trim());
                        tag = null;
                    }

                    parent.replaceChild(node, oldNode);
                }

                cfg = this.getTag(tag);
            }

            const isText = node.nodeType === Node.TEXT_NODE;

            if (cfg && (this.allowed(tag, parentTag) || isTop && cfg.group === 'text')) {
                Array.from(node.attributes).forEach(item => {
                    if (!cfg.attributes.includes(item.name)) {
                        node.removeAttribute(item.name);
                    }
                });

                if (node.hasChildNodes()) {
                    this.filterElement(node);
                }

                if (!node.hasChildNodes() && !cfg.empty) {
                    parent.removeChild(node);
                } else if (isTop && cfg.group === 'text') {
                    const p = this.document.createElement('p');
                    p.innerHTML = node.outerHTML;
                    parent.replaceChild(p, node);
                }
            } else if (isTop && (isText && !!node.nodeValue.trim() || cfg && !!node.innerText.trim())) {
                const p = this.document.createElement('p');
                p.innerText = isText ? node.nodeValue.trim() : node.innerText.trim();
                parent.replaceChild(p, node);
            } else if (cfg && !!node.innerText.trim()) {
                const text = this.document.createTextNode(node.innerText.trim());
                parent.replaceChild(text, node);
            } else if (!isText || isTop) {
                parent.removeChild(node);
            }
        });

        while ((br = parent.firstChild) && br instanceof HTMLBRElement || (br = parent.lastChild) && br instanceof HTMLBRElement) {
            parent.removeChild(br);
        }
    }

    /**
     * Decode HTML
     *
     * @param {string} html
     *
     * @return {string}
     */
    decode(html) {
        const textarea = this.document.createElement('textarea');
        textarea.innerHTML = html;

        return textarea.value;
    }

    /**
     * Returns tag configuration for given element
     *
     * @param {string} el
     *
     * @return {?Object}
     */
    getTag(el) {
        return this.tags[el.toLowerCase()] || null;
    }

    /**
     * Returns converter configuration for given element
     *
     * @param {string} el
     *
     * @return {?string}
     */
    getConverter(el) {
        return this.converters[el.toLowerCase()] || null;
    }

    /**
     * Checks if given element is allowed inside given parent element
     *
     * @param {string} el
     * @param {string} parent
     *
     * @return {boolean}
     */
    allowed(el, parent) {
        el = el.toLowerCase();
        parent = parent.toLowerCase();

        return !!this.tags[parent] && this.tags[parent].allowed.includes(el);
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
