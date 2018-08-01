import Command from './command/Command.js';
import Converter from './converter/Converter.js';
import TagManager from './tag/TagManager.js';
import Toolbar from './toolbar/Toolbar.js';
import configCommand from '../cfg/command.js';
import configConverter from '../cfg/converter.js';
import configTag from '../cfg/tag.js';

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
         * @type TagManager
         * @readonly
         */
        this.tags = new TagManager(configTag);

        /**
         * Element converters
         *
         * @type {Map<string, function>}
         * @readonly
         */
        this.converters = new Map(configConverter);

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
            if (this.tags.allowed(node.tagName, 'root')) {
                node.setAttribute('contenteditable', 'true');
            }
        });
        this.register(ev => {
            ev.forEach(item => {
                item.addedNodes.forEach(node => {
                    if (node instanceof HTMLElement && node.parentElement === this.element && this.tags.allowed(node.tagName, 'root')) {
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
        configCommand.forEach(item => {
            let command;

            if (!Array.isArray(item)
                || item.length !== 2
                || typeof item[0] !== 'string'
                || typeof item[1] !== 'function'
                || !(command = item[1](this))
                || !(command instanceof Command)
            ) {
                throw 'Invalid command';
            }

            this.commands.set(item[0], command);
        });
    }

    /**
     * Short-cut method to register a mutation observer
     *
     * @param {Function} callback
     * @param {Object} config
     */
    register(callback, config) {
        if (typeof callback !== 'function' || !config) {
            throw 'Invalid observer';
        }

        const mutation = new MutationObserver(callback);
        mutation.observe(this.element, config);
    }

    /**
     * Returns editor element's innerHTML
     *
     * @return {String}
     */
    getData() {
        this.element.innerHTML = this.filterHtml(this.element.innerHTML);

        return this.element.innerHTML;
    }

    /**
     * Insert an element
     *
     * @param {HTMLElement} element
     * @param {?HTMLElement} parent
     */
    insert(element, parent = null) {
        if (!(element instanceof HTMLElement) || !!parent && !(parent instanceof HTMLElement)) {
            throw 'Invalid HTML element';
        } else if (!parent) {
            parent = this.element;
        }

        parent.appendChild(element);
    }

    /**
     * Adds or removes formatting to/from selected text
     *
     * @param {HTMLElement} element
     */
    formatText(element) {
        if (!(element instanceof HTMLElement)) {
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
        const tag = this.tags.get(ancEl.tagName);
        const parent = !tag || tag.group === 'text' ? ancEl.parentElement : ancEl;

        if (range.startContainer instanceof Text && !range.startContainer.parentElement.isSameNode(parent)) {
            range.setStartBefore(range.startContainer.parentElement);
        }

        if (range.endContainer instanceof Text && !range.endContainer.parentElement.isSameNode(parent)) {
            range.setEndAfter(range.endContainer.parentElement);
        }

        const selText = range.toString();
        const selNodes = range.cloneContents().childNodes;
        let same = Array.from(selNodes).every(item => {
            return this.isTextOrHtml(item) && item instanceof Text && !item.nodeValue.trim() || item instanceof HTMLElement && item.tagName === element.tagName;
        });

        range.deleteContents();

        if (parent.contentEditable && this.tags.allowed(element.tagName, parent.tagName) && selText.trim() && (!tag || !same)) {
            element.innerText = selText;
            range.insertNode(element);
        } else {
            range.insertNode(this.document.createTextNode(selText));
        }

        parent.normalize();
    }

    /**
     * Execute command
     *
     * @param {String} command
     * @param {?String} value
     */
    execute(command, value = null) {
        this.document.execCommand(command, false, value);
    }

    /**
     * Filters HTML
     *
     * @param {String} html
     *
     * @return {String}
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
        const parentTag = isTop ? 'root' : parent.tagName;
        let br;

        parent.normalize();
        Array.from(parent.childNodes).forEach(node => {
            if (!this.isTextOrHtml(node)) {
                parent.removeChild(node);
                return;
            }

            node = this.convert(node);
            const isHtml = node instanceof HTMLElement;
            const name = isHtml ? node.tagName : null;
            const tag = isHtml ? this.tags.get(name) : null;

            if (tag && (this.tags.allowed(name, parentTag) || isTop && tag.group === 'text')) {
                Array.from(node.attributes).forEach(item => {
                    if (!tag.attributes.includes(item.name)) {
                        node.removeAttribute(item.name);
                    }
                });

                if (node.hasChildNodes()) {
                    this.filterElement(node);
                }

                if (!node.hasChildNodes() && !tag.empty) {
                    parent.removeChild(node);
                } else if (isTop && tag.group === 'text') {
                    const p = this.document.createElement('p');
                    p.innerHTML = node.outerHTML;
                    parent.replaceChild(p, node);
                }
            } else if (isTop && (!isHtml && !!node.nodeValue.trim() || tag && !!node.innerText.trim())) {
                const p = this.document.createElement('p');
                p.innerText = isHtml ? node.innerText.trim() : node.nodeValue.trim();
                parent.replaceChild(p, node);
            } else if (tag && !!node.innerText.trim()) {
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
        let converter;

        if (!(node instanceof HTMLElement) || !(converter = this.getConverter(node.tagName))) {
            return node;
        }

        const newNode = converter.convert(node);
        node.parentElement.replaceChild(newNode, node);

        return newNode;
    }

    /**
     * Returns converter configuration for given tag
     *
     * @param {String} name
     *
     * @return {?Converter}
     */
    getConverter(name) {
        const callback = this.converters.get(name.toLowerCase());
        let converter;

        if (typeof callback === 'function' && (converter = callback()) && converter instanceof Converter) {
            return converter;
        }

        return null;
    }

    /**
     * Indicates if given node is either a text node or a HTML element
     *
     * @param {Node} node
     *
     * @return {Boolean}
     */
    isTextOrHtml(node) {
        return node instanceof Text || node instanceof HTMLElement;
    }

    /**
     * Decode HTML
     *
     * @param {String} html
     *
     * @return {String}
     */
    decode(html) {
        const textarea = this.document.createElement('textarea');
        textarea.innerHTML = html;

        return textarea.value.replace('/&nbsp;/g', ' ');
    }

    /**
     * Converts URL
     *
     * @param {String} url
     *
     * @return {String}
     */
    url(url) {
        const a = this.document.createElement('a');
        a.href = url;

        return a.origin === this.window.origin ? a.pathname : a.href;
    }

    /**
     * Returns GUI URL
     *
     * @param {String} path
     *
     * @return {String}
     */
    gui(path) {
        return this.config.path + '/gui/' + path;
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
