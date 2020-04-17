import Observer from './Observer.js';
import Plugin from './Plugin.js';
import Tag from './Tag.js';

/**
 * Base Editor
 */
export default class Editor {
    /**
     * Creates a new instance of editor with given configuration
     *
     * @param {HTMLElement} orig
     * @param {Object} [config = {}]
     */
    constructor(orig, config = {}) {
        if (!(orig instanceof HTMLElement)) {
            throw 'No HTML element';
        }

        for (let [key, val] of Object.entries(this.constructor.defaultConfig || {})) {
            config[key] = Object.assign(config[key] || {}, val);
        }

        /**
         * Corresponding DOM element of the source
         *
         * @type {HTMLElement}
         * @readonly
         */
        this.orig = orig;

        /**
         * Correspondig DOM Document
         *
         * @type {Document}
         * @readonly
         */
        this.document = this.orig.ownerDocument;

        /**
         * Corresponding Window object
         *
         * @type {Window}
         * @readonly
         */
        this.window = this.document.defaultView;

        /**
         * Window origin
         *
         * @type {String}
         * @readonly
         */
        this.origin = this.window.origin || this.window.location.origin;

        /**
         * Corresponding DOM element of the editor
         *
         * @type {HTMLElement}
         * @readonly
         */
        this.element = this.createElement('div', {class: 'editor'});

        /**
         * Corresponding DOM element of the editor content
         *
         * @type {HTMLElement}
         * @readonly
         */
        this.content = this.createElement('div', {class: 'editor-content'});

        /**
         * Corresponding DOM element of the main toolbar
         *
         * @type {HTMLElement}
         * @readonly
         */
        this.toolbar = this.createElement('div', {class: 'editor-toolbar'});

        // Add elements
        this.orig.hidden = true;
        this.orig.insertAdjacentElement('afterend', this.element);
        this.element.appendChild(this.toolbar);
        this.element.appendChild(this.content);

        /**
         * Configuration
         *
         * @type {Object}
         * @readonly
         */
        this.config = config;

        /**
         * Translators
         *
         * @type {Map<String, Translator>}
         * @readonly
         */
        this.translators = new Map();

        /**
         * Tags
         *
         * @type {Map<String, Tag>}
         * @readonly
         */
        this.tags = this.mapTags(this.config.base.tags || []);

        /**
         * Elements
         *
         * @type {Map<String, Element>}
         * @readonly
         */
        this.elements = new Map();

        /**
         * Element converters
         *
         * @type {Map<String, Converter>}
         * @readonly
         */
        this.converters = new Map();

        /**
         * Filters
         *
         * @type {Map<String, Filter>}
         * @readonly
         */
        this.filters = new Map();

        /**
         * Dialogs
         *
         * @type {Map<String, Dialog>}
         * @readonly
         */
        this.dialogs = new Map();

        /**
         * Commands
         *
         * @type {Map<String, Command>}
         * @readonly
         */
        this.commands = new Map();

        /**
         * Plugins
         *
         * @type {Map<String, Plugin>}
         * @readonly
         */
        this.plugins = new Map();
    }

    /**
     * Creates tag map
     *
     * @private
     *
     * @param {Object[]} config
     *
     * @return {Map<String, Tag>}
     */
    mapTags(config) {
        const map = new Map();
        config.forEach(item => {
            const tag = new Tag(item);
            map.set(tag.name, tag);
        });

        return map;
    }

    /**
     * Initializes editor
     */
    init() {
        this.initPlugin();
        this.initContent();
        this.initToolbar();
    }

    /**
     * Initializes plugins
     *
     * @private
     */
    initPlugin() {
        if (Array.isArray(this.config.base.plugins)) {
            this.config.base.plugins.forEach(item => {
                if (!(item instanceof Plugin.constructor)) {
                    throw 'Invalid argument';
                }

                const plugin = new item(this);
                this.plugins.set(plugin.name, plugin);
            });
        }

        this.plugins.forEach(item => item.init());
    }

    /**
     * Initializes content
     *
     * @private
     */
    initContent() {
        if (this.orig instanceof HTMLTextAreaElement) {
            this.content.innerHTML = this.orig.value.replace('/&nbsp;/g', ' ');
            this.orig.form.addEventListener('submit', () => this.save());
        } else {
            this.content.innerHTML = this.orig.innerHTML;
        }

        this.filter(this.content);
    }

    /**
     * Initializes Toolbar
     *
     * @private
     */
    initToolbar() {
        if (!Array.isArray(this.config.base.toolbar)) {
            return;
        }

        this.config.base.toolbar.forEach(cmd => {
            if (!this.commands.has(cmd)) {
                throw 'Invalid argument';
            }

            const item = this.createElement('button', {type: 'button', 'data-cmd': cmd, title: cmd}, cmd);
            item.addEventListener('click', () => {
                if (!this.window.getSelection().containsNode(this.content, true)) {
                    this.content.focus();
                }

                this.commands.get(cmd).execute();
            });
            this.toolbar.appendChild(item);
        });
    }

    /**
     * Returns editor content element's innerHTML
     *
     * @return {String}
     */
    getData() {
        const content = this.content.cloneNode(true);
        this.filter(content, true);

        return content.innerHTML;
    }

    /**
     * Saves editor data to source element
     */
    save() {
        if (this.orig instanceof HTMLTextAreaElement) {
            this.orig.value = this.getData();
        } else {
            this.orig.innerHTML = this.getData();
        }
    }

    /**
     * Inserts widget element or adds or removes text formatting element
     *
     * @see insertWidget()
     * @see formatText()
     *
     * @param {HTMLElement} element
     */
    insert(element) {
        let tag;

        if (!(element instanceof HTMLElement) || !(tag = this.tags.get(element.tagName.toLowerCase()))) {
            throw 'Invalid HTML element';
        }

        tag.group === 'text' ? this.formatText(element) : this.insertWidget(element);
    }

    /**
     * Inserts a widget element as last child of editor element
     *
     * @private
     *
     * @param {HTMLElement} element
     */
    insertWidget(element) {
        if (!(element instanceof HTMLElement)) {
            throw 'Invalid HTML element';
        } else if (!this.allowed(element.tagName.toLowerCase(), 'root')) {
            throw 'Element is not allowed here';
        }

        this.content.appendChild(element);
    }

    /**
     * Insert text
     *
     * @param {String} text
     */
    insertText(text) {
        this.document.execCommand('inserttext', false, text);
    }

    /**
     * Adds or removes formatting to/from selected text
     *
     * @private
     *
     * @param {HTMLElement} element
     */
    formatText(element) {
        if (!(element instanceof HTMLElement)) {
            throw 'Invalid HTML element';
        }

        const sel = this.window.getSelection();
        const anc = sel.anchorNode instanceof Text ? sel.anchorNode.parentElement : sel.anchorNode;
        const ancEdit = this.getSelectedEditable();

        if (sel.isCollapsed || !sel.toString().trim() || !(anc instanceof HTMLElement) || !ancEdit) {
            return;
        }

        const range = sel.getRangeAt(0);
        const tag = this.tags.get(anc.tagName.toLowerCase());
        const parent = !tag || tag.group === 'text' ? anc.parentElement : anc;

        if (range.startContainer instanceof Text && !range.startContainer.parentElement.isSameNode(parent)) {
            range.setStartBefore(range.startContainer.parentElement);
        }

        if (range.endContainer instanceof Text && !range.endContainer.parentElement.isSameNode(parent)) {
            range.setEndAfter(range.endContainer.parentElement);
        }

        const selText = range.toString();
        const selNodes = range.cloneContents().childNodes;
        let same = Array.from(selNodes).every(item => {
            return item instanceof Text && !item.textContent.trim() || item instanceof HTMLElement && item.tagName === element.tagName;
        });

        range.deleteContents();

        if (parent.isContentEditable
            && this.allowed(element.tagName.toLowerCase(), parent.tagName.toLowerCase())
            && selText.trim()
            && (!tag || !same)
        ) {
            element.textContent = selText;
            range.insertNode(element);
        } else {
            range.insertNode(this.createText(selText));
        }

        parent.normalize();
    }

    /**
     * Creates HTML element in editor document
     *
     * @param {String} name
     * @param {Object.<String, String>} [attributes = {}]
     * @param {String} [html = '']
     *
     * @return {HTMLElement}
     */
    createElement(name, attributes = {}, html = '') {
        const el = this.document.createElement(name);
        el.innerHTML = html;

        for (let [key, val] of Object.entries(attributes)) {
            if (val) {
                el.setAttribute(key, `${val}`);
            }
        }

        return el;
    }

    /**
     * Creates text node in editor document
     *
     * @param {String} content
     *
     * @return {Text}
     */
    createText(content) {
        return this.document.createTextNode(content);
    }

    /**
     * Returns current selected element or null
     *
     * @return {?HTMLElement}
     */
    getSelectedElement() {
        const sel = this.window.getSelection();
        const anc = sel.anchorNode instanceof Text ? sel.anchorNode.parentElement : sel.anchorNode;
        const foc = sel.focusNode instanceof Text ? sel.focusNode.parentElement : sel.focusNode;

        return anc instanceof HTMLElement && foc instanceof HTMLElement && anc.isSameNode(foc) && this.content.contains(anc) ? anc : null;
    }

    /**
     * Returns current selected contenteditable or null
     *
     * @return {?HTMLElement}
     */
    getSelectedEditable() {
        const sel = this.window.getSelection();
        const anc = sel.anchorNode instanceof Text ? sel.anchorNode.parentElement : sel.anchorNode;
        const foc = sel.focusNode instanceof Text ? sel.focusNode.parentElement : sel.focusNode;

        if (anc instanceof HTMLElement && foc instanceof HTMLElement) {
            const ancEdit = anc.closest('[contenteditable=true]');
            const focEdit = foc.closest('[contenteditable=true]');

            if (ancEdit instanceof HTMLElement && focEdit instanceof HTMLElement && ancEdit.isSameNode(focEdit) && this.content.contains(ancEdit)) {
                return ancEdit;
            }
        }

        return null;
    }

    /**
     * Returns current selected widget or null
     *
     * @return {?HTMLElement}
     */
    getSelectedWidget() {
        const el = this.getSelectedElement();

        return el ? el.closest('div.editor-content > *') : null;
    }

    /**
     * Focus end of contents
     *
     * @param {HTMLElement} element
     */
    focusEnd(element) {
        if (!(element instanceof HTMLElement)) {
            throw 'No HTML element';
        }

        const range = this.document.createRange();
        const sel = this.window.getSelection();
        element.focus();
        range.selectNodeContents(element);
        range.collapse();
        sel.removeAllRanges();
        sel.addRange(range);
    }

    /**
     * Short-cut method to register a mutation observer
     *
     * @param {Observer} observer
     * @param {Object} [config = {childList: true, subtree: true}]
     */
    observe(observer, config = {childList: true, subtree: true}) {
        if (!(observer instanceof Observer)) {
            throw 'Invalid argument';
        }

        const mutation = new MutationObserver(ev => observer.observe(ev));
        mutation.observe(this.content, config);
    }

    /**
     * Filters element
     *
     * @param {HTMLElement} parent
     * @param {Boolean} [forceRoot = false]
     */
    filter(parent, forceRoot = false) {
        if (!(parent instanceof HTMLElement)) {
            throw 'No HTML element';
        }

        // Prefilter content
        const isRoot = forceRoot || this.content.isSameNode(parent);
        const parentName = forceRoot ? 'root' : this.getTagName(parent);
        parent.normalize();
        Array.from(parent.childNodes).forEach(node => {
            if (node instanceof HTMLElement) {
                node = this.convert(node);
            }

            if (node instanceof HTMLElement) {
                const name = node.tagName.toLowerCase();
                const tag = this.tags.get(name);
                const text = node.textContent.trim();

                if (tag && (this.allowed(name, parentName) || isRoot && tag.group === 'text' && this.allowed('p', parentName))) {
                    Array.from(node.attributes).forEach(item => {
                        if (!tag.attributes.includes(item.name)) {
                            node.removeAttribute(item.name);
                        }
                    });

                    if (node.hasChildNodes()) {
                        this.filter(node);
                    }

                    if (!node.hasChildNodes() && !tag.empty) {
                        parent.removeChild(node);
                    } else if (!this.allowed(name, parentName)) {
                        parent.replaceChild(this.createElement('p', {}, node.outerHTML), node);
                    }
                } else if (isRoot && text && this.allowed('p', parentName)) {
                    parent.replaceChild(this.createElement('p', {}, text), node);
                } else if (text && this.allowed('text', parentName)) {
                    parent.replaceChild(this.createText(text), node);
                } else {
                    parent.removeChild(node);
                }
            } else if (node instanceof Text) {
                const text = node.textContent.trim();

                if (isRoot && text && this.allowed('p', parentName)) {
                    parent.replaceChild(this.createElement('p', {}, text), node);
                } else if (isRoot) {
                    parent.removeChild(node);
                }
            } else {
                parent.removeChild(node);
            }
        });

        // Apply filters
        this.filters.forEach(item => {
            parent.normalize();
            item.filter(parent)
        });

        // Handle linebreaks
        parent.normalize();
        parent.innerHTML = parent.innerHTML.replace(/^\s*(<br\s*\/?>\s*)+/gi, '').replace(/\s*(<br\s*\/?>\s*)+$/gi, '');

        if (parent instanceof HTMLParagraphElement) {
            parent.outerHTML = parent.outerHTML.replace(/\s*(<br\s*\/?>\s*){2,}/gi, '</p><p>');
        } else{
            parent.innerHTML = parent.innerHTML.replace(/\s*(<br\s*\/?>\s*){2,}/gi, '<br>');
        }
    }

    /**
     * Returns tag name from element considering exception for root element
     *
     * @param {HTMLElement} element
     *
     * @return {String}
     */
    getTagName(element) {
        if (!(element instanceof HTMLElement)) {
            throw 'No HTML element';
        }

        return this.content.isSameNode(element) ? 'root' : element.tagName.toLowerCase();
    }

    /**
     * Checks if given element or group is allowed inside given parent element
     *
     * @param {String} name
     * @param {String} parentName
     *
     * @return {Boolean}
     */
    allowed(name, parentName) {
        const tag = this.tags.get(name);
        const group = tag ? tag.group : name;
        const parentTag = this.tags.get(parentName);

        return parentTag && parentTag.children.includes(group);
    }

    /**
     * Converts element
     *
     * @param {HTMLElement} element
     *
     * @return {HTMLElement|Text}
     */
    convert(element) {
        if (!(element instanceof HTMLElement)) {
            throw 'No HTML element';
        }

        const converter = this.converters.get(element.tagName.toLowerCase());

        if (!converter) {
            return element;
        }

        const newNode = converter.convert(element);
        element.parentElement.replaceChild(newNode, element);

        return newNode;
    }

    /**
     * Factory method to create a new instance of editor with given configuration
     *
     * @param {HTMLElement} element
     * @param {Object} [config = {}]
     *
     * @return {Editor}
     */
    static create(element, config = {}) {
        const editor = new this(element, config);
        editor.init();

        return editor;
    }
}
