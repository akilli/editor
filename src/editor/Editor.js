import Command from './Command.js';
import Converter from './Converter.js';
import Dialog from './Dialog.js';
import EditorObject from './EditorObject.js';
import Filter from './Filter.js';
import Observer from './Observer.js';
import Tag from './Tag.js';
import configCommand from '../../cfg/command.js';
import configConverter from '../../cfg/converter.js';
import configDialog from '../../cfg/dialog.js';
import configFilter from '../../cfg/filter.js';
import configObserver from '../../cfg/observer.js';
import configTag from '../../cfg/tag.js';
import i18n from '../../cfg/i18n.js';

/**
 * Editor
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
         * Translations
         *
         * @type {Object.<String, String>}
         * @readonly
         */
        this.i18n = i18n[this.config.lang] || {};

        /**
         * Tags
         *
         * @type {Map<String, Tag>}
         * @readonly
         */
        this.tags = this.configMap(configTag, Tag);

        /**
         * Element converters
         *
         * @type {Map<String, Converter>}
         * @readonly
         */
        this.converters = this.configMap(configConverter, Converter);

        /**
         * Dialogs
         *
         * @type {Map<String, Dialog>}
         * @readonly
         */
        this.dialogs = this.configMap(configDialog, Dialog);

        /**
         * Commands
         *
         * @type {Map<String, Command>}
         * @readonly
         */
        this.commands = this.configMap(configCommand, Command);

        /**
         * Observers
         *
         * @type {Map<String, Observer>}
         * @readonly
         */
        this.observers = this.configMap(configObserver, Observer);

        /**
         * Filters
         *
         * @type {Map<String, Filter>}
         * @readonly
         */
        this.filters = this.configMap(configFilter, Filter);
    }

    /**
     * Creates map
     *
     * @private
     *
     * @param {Function[]} data
     * @param {Function} constructor
     *
     * @return {Map<String, EditorObject>}
     */
    configMap(data, constructor) {
        if (!Array.isArray(data)) {
            throw 'Invalid argument';
        }

        const map = new Map();
        data.forEach(item => {
            if (typeof item !== 'function' || !(item = item(this)) || !(item instanceof constructor) || !(item instanceof EditorObject)) {
                throw 'Invalid argument';
            }

            map.set(item.name, item);
        });

        return map;
    }

    /**
     * Init editor
     */
    init() {
        this.initObserver();
        this.initContent();
        this.initToolbar();
    }

    /**
     * Init observer
     *
     * @private
     */
    initObserver() {
        this.observers.forEach(item => this.register(ev => item.observe(ev)));
    }

    /**
     * Init content
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
     * Init Toolbar
     *
     * @private
     */
    initToolbar() {
        for (let cmd of this.commands.entries()) {
            const item = this.createElement('button', {type: 'button', 'data-cmd': cmd[0], title: cmd[0]}, cmd[0]);
            item.addEventListener('click', () => {
                if (!this.window.getSelection().containsNode(this.content, true)) {
                    this.content.focus();
                }

                cmd[1].execute();
            });
            this.toolbar.appendChild(item);
        }
    }

    /**
     * Short-cut method to register a mutation observer
     *
     * @param {Function} call
     * @param {Object} [config = {childList: true, subtree: true}]
     */
    register(call, config = {childList: true, subtree: true}) {
        if (typeof call !== 'function') {
            throw 'Invalid argument';
        }

        const mutation = new MutationObserver(call);
        mutation.observe(this.content, config);
    }

    /**
     * Returns editor element's innerHTML
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
     * Insert text
     *
     * @param {String} text
     */
    insertText(text) {
        this.document.execCommand('inserttext', false, text);
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

        if (!(element instanceof HTMLElement) || !(tag = this.getTag(element.tagName))) {
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
        } else if (!this.allowed(element.tagName, 'root')) {
            throw 'Element is not allowed here';
        }

        this.content.appendChild(element);
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
        const tag = this.getTag(anc.tagName);
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

        if (parent.isContentEditable && this.allowed(element.tagName, parent.tagName) && selText.trim() && (!tag || !same)) {
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
     * @param {String} [text = '']
     *
     * @return {HTMLElement}
     */
    createElement(name, attributes = {}, text = '') {
        const el = this.document.createElement(name);
        el.textContent = text;

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
     * Filters element
     *
     * @param {HTMLElement} parent
     * @param {Boolean} [forceRoot = false]
     */
    filter(parent, forceRoot = false) {
        if (!(parent instanceof HTMLElement)) {
            throw 'No HTML element';
        }

        this.filters.forEach(item => item.filter(parent, forceRoot));
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

        return this.content.isSameNode(element) ? 'root' : element.tagName;
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
     * Checks if given group is allowed inside given parent element
     *
     * @param {String} group
     * @param {String} parentName
     *
     * @return {Boolean}
     */
    allowedGroup(group, parentName) {
        const parentTag = this.getTag(parentName);

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
     * Translates given string
     *
     * @param {String} key
     *
     * @return {String}
     */
    t(key) {
        return this.i18n[key] || key;
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
        const editor = new Editor(element, config);
        editor.init();

        return editor;
    }
}
