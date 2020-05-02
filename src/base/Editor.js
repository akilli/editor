import Command from './Command.js';
import Converter from './Converter.js';
import Dialog from './Dialog.js';
import Filter from './Filter.js';
import Observer from './Observer.js';
import Plugin from './Plugin.js';
import Tag from './Tag.js';
import Translator from './Translator.js';
import TypedMap from './TypedMap.js';

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
        if (!(orig instanceof HTMLElement) || config && typeof config !== 'object') {
            throw 'Invalid argument';
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
        this.element = this.createElement('div', {attributes: {class: 'editor'}});

        /**
         * Corresponding DOM element of the editor content
         *
         * @type {HTMLElement}
         * @readonly
         */
        this.content = this.createElement('div', {attributes: {class: 'editor-content'}});

        /**
         * Corresponding DOM element of the main toolbar
         *
         * @type {HTMLElement}
         * @readonly
         */
        this.toolbar = this.createElement('div', {attributes: {class: 'editor-toolbar', role: 'toolbar'}});

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
         * @type {TypedMap<String, Translator>}
         * @readonly
         */
        this.translators = new TypedMap(Translator);

        /**
         * Tags
         *
         * @type {TypedMap<String, Tag>}
         * @readonly
         */
        this.tags = new TypedMap(Tag);

        /**
         * Element converters
         *
         * @type {TypedMap<String, Converter>}
         * @readonly
         */
        this.converters = new TypedMap(Converter);

        /**
         * Filters
         *
         * @type {TypedMap<String, Filter>}
         * @readonly
         */
        this.filters = new TypedMap(Filter);

        /**
         * Dialogs
         *
         * @type {TypedMap<String, Dialog>}
         * @readonly
         */
        this.dialogs = new TypedMap(Dialog);

        /**
         * Commands
         *
         * @type {TypedMap<String, Command>}
         * @readonly
         */
        this.commands = new TypedMap(Command);

        /**
         * Plugins
         *
         * @type {TypedMap<String, Plugin>}
         * @readonly
         */
        this.plugins = new TypedMap(Plugin);
    }

    /**
     * Initializes editor
     */
    init() {
        if (this.plugins.size === 0) {
            this.initChildren();
            this.initConfig();
            this.initPlugins();
            this.initToolbar();
        }

        this.initContent();
        this.initDom();
    }

    /**
     * Appends toolbar and content elements to editor element
     *
     * @private
     */
    initChildren() {
        this.element.appendChild(this.toolbar);
        this.element.appendChild(this.content);
    }

    /**
     * Initializes configuration
     *
     * @private
     */
    initConfig() {
        for (let [key, val] of Object.entries(this.constructor.defaultConfig())) {
            this.config[key] = Object.assign({}, val, this.config[key] || {});
        }
    }

    /**
     * Initializes plugins
     *
     * @private
     */
    initPlugins() {
        this.config.base.plugins.map(item => {
            const config = item.defaultConfig();
            const plugin = new item(this);

            if (Object.keys(config).length > 0) {
                this.config[plugin.name] = Object.assign({}, config, this.config[plugin.name] || {});
            }

            this.plugins.set(plugin);
        });
        this.plugins.forEach(item => item.init());
    }

    /**
     * Initializes Toolbar
     *
     * @private
     */
    initToolbar() {
        this.config.base.toolbar.forEach(cmd => this.toolbar.appendChild(this.createElement('button', {
            attributes: {type: 'button', 'data-cmd': cmd, title: cmd},
            content: cmd,
        })));
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
     * Adds editor element to DOM
     *
     * @private
     */
    initDom() {
        this.orig.insertAdjacentElement('afterend', this.element);
        this.orig.hidden = true;
    }

    /**
     * Removes editor element from DOM
     */
    destroy() {
        this.element.parentElement.removeChild(this.element);
        this.orig.hidden = false;
    }

    /**
     * Returns editor content element's innerHTML
     *
     * @return {String}
     */
    getData() {
        const content = this.content.cloneNode(true);
        this.filter(content);

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
     * Inserts element
     *
     * @param {HTMLElement} element
     */
    insert(element) {
        if (!(element instanceof HTMLElement) || !this.allowed(element.tagName.toLowerCase(), 'root')) {
            throw 'Invalid argument';
        }

        this.content.appendChild(element);
    }

    /**
     * Inserts text
     *
     * @param {String} text
     */
    insertText(text) {
        this.document.execCommand('inserttext', false, text);
    }

    /**
     * Adds/removes formatting to/from selected text
     *
     * @param {HTMLElement} element
     */
    format(element) {
        if (!(element instanceof HTMLElement)) {
            throw 'Invalid argument';
        }

        const sel = this.window.getSelection();
        const anc = sel.anchorNode instanceof Text ? sel.anchorNode.parentElement : sel.anchorNode;
        const ancEdit = this.getSelectedEditable();

        if (sel.isCollapsed || !sel.toString().trim() || !(anc instanceof HTMLElement) || !ancEdit) {
            return;
        }

        const range = sel.getRangeAt(0);
        const tag = this.tags.get(anc.tagName.toLowerCase());
        const parent = !tag || tag.group === 'format' ? anc.parentElement : anc;

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
     * Registers custom element
     *
     * @param {String} name
     * @param {Function} constructor
     * @param {?String} [parentName = null]
     */
    registerElement(name, constructor, parentName = null) {
        if (typeof this.window.customElements.get(name) === 'undefined') {
            this.window.customElements.define(name, constructor, parentName ? {extends: parentName} : null);
        }
    }

    /**
     * Creates HTML element in editor document
     *
     * @param {String} name
     * @param {Object.<String, String>} [attributes = {}]
     * @param {String} [content = '']
     * @param {Boolean} [html = false]
     * @param {String} [is = null]
     *
     * @return {HTMLElement}
     */
    createElement(name, {attributes = {}, content = '', html = false, is = null} = {}) {
        const element = this.document.createElement(name, is ? {is: is} : null);

        if (content && html) {
            element.innerHTML = content;
        } else if (content) {
            element.textContent = content;
        }

        for (let [key, val] of Object.entries(attributes)) {
            if (val) {
                element.setAttribute(key, `${val}`);
            }
        }

        return element;
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

            if (ancEdit && focEdit && ancEdit.isSameNode(focEdit) && this.content.contains(ancEdit)) {
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
            throw 'Invalid argument';
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
     * @param {HTMLElement} [target = null]
     * @param {Object.<String, Boolean|String[]>} [config = {childList: true, subtree: true}]
     */
    observe(observer, {target = null, config = {childList: true, subtree: true}} = {}) {
        if (!(observer instanceof Observer) || target && !(target instanceof HTMLElement)) {
            throw 'Invalid argument';
        }

        const mutation = new MutationObserver(ev => observer.observe(ev));
        mutation.observe(target || this.content, config);
    }

    /**
     * Filters element
     *
     * @param {HTMLElement} element
     */
    filter(element) {
        if (!(element instanceof HTMLElement)) {
            throw 'Invalid argument';
        }

        this.filters.forEach(item => {
            element.normalize();
            item.filter(element)
        });
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
            throw 'Invalid argument';
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
     * Indicates if given element is the editor content aka root element
     *
     * @param {HTMLElement} element
     *
     * @return {Boolean}
     */
    isRoot(element) {
        if (!(element instanceof HTMLElement)) {
            throw 'Invalid argument';
        }

        return this.content.isSameNode(element) || element.getAttribute('class') === 'editor-content';
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
     * Returns relative or absolute URL depending on its origin
     *
     * @param {String} url
     *
     * @return {String}
     */
    url(url) {
        const a = this.createElement('a', {attributes: {href: url}});

        return a.origin === this.origin ? a.pathname : a.href;
    }

    /**
     * Returns default configuration
     *
     * @return {Object.<String, Object>}
     */
    static defaultConfig() {
        return {};
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
