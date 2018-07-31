import Command from './command/Command.js';
import DetailsCommand from './command/DetailsCommand.js';
import HeadingCommand from './command/HeadingCommand.js';
import LinkCommand from './command/LinkCommand.js';
import ListCommand from './command/ListCommand.js';
import MediaCommand from './command/MediaCommand.js';
import ParagraphCommand from './command/ParagraphCommand.js';
import QuoteCommand from './command/QuoteCommand.js';
import TableCommand from './command/TableCommand.js';
import TextFormatCommand from './command/TextFormatCommand.js';
import Toolbar from './ui/Toolbar.js';
import cfgConverter from '../cfg/converter.js';
import cfgTag from '../cfg/tag.js';

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
         * @type {Map<string, CfgTag>}
         * @readonly
         */
        this.tags = new Map(cfgTag);

        /**
         * Element converters
         *
         * @type {Map<string, string>}
         * @readonly
         */
        this.converters = new Map(cfgConverter);

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
        this.initGui();
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
            element.parentElement.insertBefore(this.element, element);
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
                    if (node instanceof HTMLElement && node.parentElement === this.element && this.allowed(node.tagName, '_root_')) {
                        node.setAttribute('contenteditable', 'true');
                    }
                });
            });
        }, {childList: true});
    }

    /**
     * Init GUI
     */
    initGui() {
        const css = this.document.styleSheets;
        const link = this.document.createElement('link');

        link.rel = 'stylesheet';
        link.href = this.gui('editor.css');

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
        this.commands.set('bold', new TextFormatCommand(this, 'strong'));
        this.commands.set('italic', new TextFormatCommand(this, 'i'));
        this.commands.set('definition', new TextFormatCommand(this, 'dfn'));
        this.commands.set('mark', new TextFormatCommand(this, 'mark'));
        this.commands.set('keyboard', new TextFormatCommand(this, 'kbd'));
        this.commands.set('link', new LinkCommand(this));
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
     * Adds or removes formatting to/from selected text
     *
     * @param {HTMLElement} el
     */
    formatText(el) {
        if (!(el instanceof HTMLElement)) {
            throw 'Invalid HTML element';
        }

        const sel = this.window.getSelection();
        const anc = sel.anchorNode;
        const foc = sel.focusNode;

        if (sel.isCollapsed || !sel.toString().trim() || !this.isTextOrHtml(anc)) {
            return;
        }

        const ancEl = anc instanceof Text ? anc.parentElement : anc;
        const focEl = foc instanceof Text ? foc.parentElement : foc;
        const ancEdit = ancEl.closest('[contenteditable=true]');
        const focEdit = focEl.closest('[contenteditable=true]');

        if (!ancEdit || !focEdit || !ancEdit.isSameNode(focEdit)) {
            return;
        }

        const range = sel.getRangeAt(0);
        const cfg = this.getTag(ancEl.tagName);
        const parent = !cfg || cfg.group === 'text' ? ancEl.parentElement : ancEl;

        if (range.startContainer instanceof Text && !range.startContainer.parentElement.isSameNode(parent)) {
            range.setStartBefore(range.startContainer.parentElement);
        }

        if (range.endContainer instanceof Text && !range.endContainer.parentElement.isSameNode(parent)) {
            range.setEndAfter(range.endContainer.parentElement);
        }

        const selText = range.toString();
        const selNodes = range.cloneContents().childNodes;
        let same = Array.from(selNodes).every(item => {
            return this.isTextOrHtml(item) && item instanceof Text && !item.nodeValue.trim() || item instanceof HTMLElement && item.tagName === el.tagName;
        });

        range.deleteContents();

        if (parent.contentEditable && this.allowed(el.tagName, parent.tagName) && selText.trim() && (!cfg || !same)) {
            el.innerText = selText;
            range.insertNode(el);
        } else {
            range.insertNode(this.document.createTextNode(selText));
        }

        parent.normalize();
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

        const isTop = !parent.parentElement;
        const parentTag = isTop ? '_root_' : parent.tagName;
        let br;

        parent.normalize();
        Array.from(parent.childNodes).forEach(node => {
            if (!this.isTextOrHtml(node)) {
                parent.removeChild(node);
                return;
            }

            node = this.convert(node);
            const isHtml = node instanceof HTMLElement;
            const tag = isHtml ? node.tagName : null;
            const cfg = isHtml ? this.getTag(tag) : null;

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
            } else if (isTop && (!isHtml && !!node.nodeValue.trim() || cfg && !!node.innerText.trim())) {
                const p = this.document.createElement('p');
                p.innerText = isHtml ? node.innerText.trim() : node.nodeValue.trim();
                parent.replaceChild(p, node);
            } else if (cfg && !!node.innerText.trim()) {
                const text = this.document.createTextNode(node.innerText.trim());
                parent.replaceChild(text, node);
            } else if (isHtml || isTop) {
                parent.removeChild(node);
            }
        });

        while ((br = parent.firstChild) && br instanceof HTMLBRElement || (br = parent.lastChild) && br instanceof HTMLBRElement) {
            parent.removeChild(br);
        }
    }

    /**
     * Converts element
     *
     * @param {Node} node
     *
     * @return {Node}
     */
    convert(node) {
        let conv;
        let newNode;

        if (!(node instanceof HTMLElement) || !(conv = this.getConverter(node.tagName))) {
            return node;
        }

        if (conv !== '_text_' && (newNode = this.document.createElement(conv)) && newNode instanceof HTMLElement) {
            newNode.innerHTML = node.innerHTML;
        } else {
            newNode = this.document.createTextNode(node.innerText.trim());
        }

        node.parentElement.replaceChild(newNode, node);

        return newNode;
    }

    /**
     * Indicates if given node is either a text node or a HTML element
     *
     * @param {Node} node
     *
     * @return {boolean}
     */
    isTextOrHtml(node) {
        return node instanceof Text || node instanceof HTMLElement;
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

        return textarea.value.replace('/&nbsp;/g', ' ');
    }

    /**
     * Returns tag configuration for given tag
     *
     * @param {string} tag
     *
     * @return {?Object}
     */
    getTag(tag) {
        return this.tags.get(tag.toLowerCase()) || null;
    }

    /**
     * Returns converter configuration for given tag
     *
     * @param {string} tag
     *
     * @return {?string}
     */
    getConverter(tag) {
        return this.converters.get(tag.toLowerCase()) || null;
    }

    /**
     * Checks if given element is allowed inside given parent element
     *
     * @param {string} tag
     * @param {string} parentTag
     *
     * @return {boolean}
     */
    allowed(tag, parentTag) {
        const cfg = this.getTag(tag);
        const parentCfg = this.getTag(parentTag);

        return cfg && parentCfg && parentCfg.children.includes(cfg.group);
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
     * Returns GUI URL
     *
     * @param {string} path
     *
     * @return {string}
     */
    gui(path) {
        return this.config.path + '/gui/' + path;
    }

    /**
     * Returns icon URL
     *
     * @param {string} name
     *
     * @return {string}
     */
    icon(name) {
        return this.gui('icon/' + name + '.svg');
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
