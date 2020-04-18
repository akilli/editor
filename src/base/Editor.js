import BreakFilter from './BreakFilter.js';
import Command from './Command.js';
import ContentFilter from './ContentFilter.js';
import Converter from './Converter.js';
import Dialog from './Dialog.js';
import Element from './Element.js';
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
        this.tags = new TypedMap(Tag, this.config.base.tags.map(item => new Tag(item)));

        /**
         * Elements
         *
         * @type {TypedMap<String, Element>}
         * @readonly
         */
        this.elements = new TypedMap(Element);

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
        this.plugins = new TypedMap(Plugin, this.config.base.plugins.map(item => new item(this)));
    }

    /**
     * Initializes editor
     */
    init() {
        this.filters.set(new ContentFilter(this, 'content'));
        this.plugins.forEach(item => item.init());
        this.filters.set(new BreakFilter(this, 'break'));
        this.initContent();
        this.initToolbar();
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
     */
    filter(parent) {
        if (!(parent instanceof HTMLElement)) {
            throw 'No HTML element';
        }

        this.filters.forEach(item => {
            parent.normalize();
            item.filter(parent)
        });
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
            throw 'No HTML element';
        }

        return this.content.isSameNode(element) || element.getAttribute('class') === 'editor-content';
    }

    /**
     * Returns tag name from element considering exception for root element
     *
     * @param {HTMLElement} element
     *
     * @return {String}
     */
    getTagName(element) {
        return this.isRoot(element) ? 'root' : element.tagName.toLowerCase();
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
