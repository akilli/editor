import Command from './command/Command.js';
import Converter from './converter/Converter.js';
import Tag from './tag/Tag.js';
import TextCommand from './command/TextCommand.js';
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
         * Corresponding DOM element of the editor
         *
         * @type {HTMLElement}
         * @readonly
         */
        this.element = this.createElement(element);

        /**
         * Configuration
         *
         * @typedef {Object} Config
         * @property {String} gui          URL path to editor root directory
         * @property {String} mediabrowser Media browser URL
         *
         * @type {Config}
         * @readonly
         */
        this.config = config;

        /**
         * Tags
         *
         * @type {Map<String, Tag>}
         * @readonly
         */
        this.tags = this.createTags(configTag);

        /**
         * Element converters
         *
         * @type {Map<String, Converter>}
         * @readonly
         */
        this.converters = this.createConverters(configConverter);

        /**
         * Commands
         *
         * @type {Map<String, Command>}
         */
        this.commands = this.createCommands(configCommand);

        /**
         * Corresponding DOM element of the widget toolbar
         *
         * @type {HTMLElement}
         * @readonly
         */
        this.toolbarWidget = this.createToolbar('widget');

        /**
         * Corresponding DOM element of the editable's toolbar
         *
         * @type {HTMLElement}
         * @readonly
         */
        this.toolbarEditable = this.createToolbar('editable');
    }

    /**
     * Creates editor element if necessary
     *
     * @param {HTMLElement} element
     *
     * @return {HTMLElement}
     */
    createElement(element) {
        if (element instanceof HTMLTextAreaElement) {
            const textarea = element;
            element = this.document.createElement('div');
            element.innerHTML = textarea.value;
            textarea.parentElement.insertBefore(element, textarea);
            textarea.setAttribute('hidden', 'hidden');
            textarea.form.addEventListener('submit', () => {
                textarea.value = this.getData();
            });
        }

        element.classList.add('editor');

        return element;
    }

    /**
     * Creates tags map
     *
     * @param {Object[]} config
     *
     * @return {Map<String, Tag>}
     */
    createTags(config) {
        const map = new Map();

        config.forEach(item => {
            const tag = new Tag(item);
            return map.set(tag.name, tag);
        });

        return map;
    }

    /**
     * Creates converters map
     *
     * @param {Object.<String, Converter>} config
     *
     * @return {Map<String, Converter>}
     */
    createConverters(config) {
        const map = new Map();

        Object.getOwnPropertyNames(config).forEach(key => {
            if (!(config[key] instanceof Converter)) {
                throw 'Invalid converter';
            }

            map.set(key, config[key]);
        });

        return map;
    }

    /**
     * Creates commands map
     *
     * @param {Object.<String, Function>} config
     *
     * @return {Map<String, Command>}
     */
    createCommands(config) {
        const map = new Map();

        Object.getOwnPropertyNames(config).forEach(key => {
            let command;

            if (typeof config[key] !== 'function' || !(command = config[key](this)) || !(command instanceof Command)) {
                throw 'Invalid command';
            }

            return map.set(key, command);
        });

        return map;
    }

    /**
     * Creates a toolbar with given name
     *
     * @param {String} name
     *
     * @return {HTMLElement}
     */
    createToolbar(name) {
        if (!name || typeof name !== 'string') {
            throw 'Invalid toolbar name';
        }

        const toolbar = this.document.createElement('div');

        toolbar.classList.add('editor-toolbar');
        toolbar.classList.add('editor-toolbar-' + name);
        this.element.parentNode.insertBefore(toolbar, this.element);

        return toolbar;
    }

    /**
     * Init editor
     */
    init() {
        this.initElement();
        this.initGui();
        this.initToolbar();
    }

    /**
     * Init element
     */
    initElement() {
        const callback = node => {
            if (node instanceof HTMLElement && node.parentElement === this.element && this.allowed(node.tagName, 'root')) {
                node.setAttribute('contenteditable', 'true');
            }
        };
        this.element.innerHTML = this.filterHtml(this.element.innerHTML);
        Array.from(this.element.children).forEach(callback);
        this.register(ev => {
            ev.forEach(item => {
                item.addedNodes.forEach(callback);
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
     * Init Toolbar
     */
    initToolbar() {
        for (let item of this.commands.entries()) {
            const img = this.document.createElement('img');

            img.setAttribute('src', this.gui('command/' + item[0] + '.svg'));
            img.setAttribute('alt', item[0]);
            img.setAttribute('title', item[0]);
            img.addEventListener('click', () => {
                if (!this.window.getSelection().containsNode(this.element, true)) {
                    this.element.focus();
                }

                item[1].execute();
            });

            if (item[1] instanceof TextCommand) {
                this.toolbarEditable.appendChild(img);
            } else {
                this.toolbarWidget.appendChild(img);
            }
        }
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
        const tag = this.getTag(ancEl.tagName);
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

        if (parent.contentEditable && this.allowed(element.tagName, parent.tagName) && selText.trim() && (!tag || !same)) {
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
            const tag = isHtml ? this.getTag(name) : null;

            if (tag && (this.allowed(name, parentTag) || isTop && tag.group === 'text')) {
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
     * Returns tag configuration vor given tag name
     *
     * @param {String} name
     *
     * @return {?Tag}
     */
    getTag(name) {
        return this.tags.get(name.toLowerCase()) || null;
    }

    /**
     * Checks if given element is allowed inside given parent element
     *
     * @param {String} name
     * @param {String} parentName
     *
     * @return {Boolean}
     */
    allowed(name, parentName) {
        const tag = this.getTag(name);
        const parentTag = this.getTag(parentName);

        return tag && parentTag && parentTag.children.includes(tag.group);
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

        if (!(node instanceof HTMLElement) || !(converter = this.converters.get(node.tagName.toLowerCase()))) {
            return node;
        }

        const newNode = converter.convert(node);
        node.parentElement.replaceChild(newNode, node);

        return newNode;
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
        return this.config.gui + '/' + path;
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
