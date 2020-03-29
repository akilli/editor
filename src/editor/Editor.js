import Command from './Command.js';
import Config from './Config.js';
import Converter from './Converter.js';
import Filter from './Filter.js';
import Media from './Media.js';
import Observer from './Observer.js';
import Tag from './Tag.js';
import TextCommand from './TextCommand.js';
import configBrowser from '../../cfg/browser.js';
import configCommand from '../../cfg/command.js';
import configConverter from '../../cfg/converter.js';
import configFilter from '../../cfg/filter.js';
import configMedia from '../../cfg/media.js';
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
     * @param {Object} [cfg = {}]
     */
    constructor(orig, cfg = {}) {
        if (!(orig instanceof HTMLElement)) {
            throw 'No HTML element';
        }

        const element = orig.ownerDocument.createElement('div');
        const content = orig.ownerDocument.createElement('div');
        const toolbarMain = orig.ownerDocument.createElement('div');
        const toolbarEditable = orig.ownerDocument.createElement('div');

        element.classList.add('editor');
        content.classList.add('editor-content');
        toolbarMain.classList.add('editor-toolbar', 'editor-toolbar-main');
        toolbarEditable.classList.add('editor-toolbar', 'editor-toolbar-editable');

        orig.hidden = true;
        orig.insertAdjacentElement('afterend', element);
        element.appendChild(toolbarMain);
        element.appendChild(content);
        element.appendChild(toolbarEditable);

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
         * Corresponding DOM element of the editor
         *
         * @type {HTMLDivElement}
         * @readonly
         */
        this.element = element;

        /**
         * Corresponding DOM element of the editor content
         *
         * @type {HTMLDivElement}
         * @readonly
         */
        this.content = content;

        /**
         * Corresponding DOM element of the main toolbar
         *
         * @type {HTMLDivElement}
         * @readonly
         */
        this.toolbarMain = toolbarMain;

        /**
         * Corresponding DOM element of the editable toolbar
         *
         * @type {HTMLDivElement}
         * @readonly
         */
        this.toolbarEditable = toolbarEditable;

        /**
         * Configuration
         *
         * @type {Config}
         * @readonly
         */
        this.config = new Config(cfg);

        /**
         * Media
         *
         * @type {Media}
         * @readonly
         */
        this.media = new Media(configMedia);

        /**
         * Tags
         *
         * @type {Map<String, Tag>}
         * @readonly
         */
        this.tags = this.configTags(configTag);

        /**
         * Element converters
         *
         * @type {Map<String, Converter>}
         * @readonly
         */
        this.converters = this.configMap(configConverter, Converter);

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
     * @param {Object.<String, Function>} config
     * @param {Function} constructor
     *
     * @return {Map<String, Object>}
     */
    configMap(config, constructor) {
        const map = new Map();

        Object.getOwnPropertyNames(config).forEach(key => {
            let item;

            if (typeof config[key] !== 'function' || !(item = config[key](this)) || !(item instanceof constructor)) {
                throw 'Invalid constructor';
            }

            map.set(key, item);
        });

        return map;
    }

    /**
     * Creates tags map
     *
     * @private
     *
     * @param {Object[]} config
     *
     * @return {Map<String, Tag>}
     */
    configTags(config) {
        const map = new Map();

        config.forEach(item => {
            const tag = new Tag(item);
            map.set(tag.name, tag);
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
        this.content.addEventListener('selectstart', () => {
            const active = this.document.activeElement;

            if (active.isContentEditable && this.allowedGroup('text', active.tagName)) {
                this.toolbarEditable.classList.add('editor-toolbar-active');
                this.toolbarEditable.style.top = (active.offsetTop + active.offsetParent.offsetTop - this.toolbarEditable.clientHeight) + 'px';
            }
        });
        this.document.addEventListener('selectionchange', () => {
            const active = this.document.activeElement;

            if (this.window.getSelection().isCollapsed || !active.isContentEditable || !this.content.contains(active)) {
                this.toolbarEditable.classList.remove('editor-toolbar-active');
                this.toolbarEditable.removeAttribute('style');
            }
        });

        for (let cmd of this.commands.entries()) {
            const item = this.createElement('button', {
                type: 'button',
                'data-cmd': cmd[0],
                title: cmd[0],
            });
            item.textContent = cmd[0];
            item.addEventListener('click', () => {
                if (!this.window.getSelection().containsNode(this.content, true)) {
                    this.content.focus();
                }

                cmd[1].execute();
            });

            if (cmd[1] instanceof TextCommand) {
                this.toolbarEditable.appendChild(item);
            } else {
                this.toolbarMain.appendChild(item);
            }
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
            throw 'Invalid observer';
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
     * Inserts an element at the editor element or optionally after given reference element
     *
     * @param {HTMLElement} element
     * @param {?HTMLElement} [ref = null]
     */
    insert(element, ref = null) {
        if (!(element instanceof HTMLElement) || ref && !(ref instanceof HTMLElement)) {
            throw 'Invalid HTML element';
        }

        const parent = ref ? ref.parentElement : this.content;
        const parentName = this.getTagName(parent);

        if (!this.content.contains(parent) || !this.allowed(element.tagName, parentName)) {
            throw 'Element is not allowed here';
        }

        parent.insertBefore(element, ref ? ref.nextElementSibling : null);
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
     *
     * @return {HTMLElement}
     */
    createElement(name, attributes = {}) {
        const el = this.document.createElement(name);

        for (let [key, val] of Object.entries(attributes)) {
            el.setAttribute(key, `${val}`);
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
     * @param {...String} args
     *
     * @return {String}
     */
    i18n(key, ...args) {
        key = this.config.i18n[key] ? this.config.i18n[key] : key;

        for (let i = 0; i < args.length; i++) {
            key = key.replace(/%s/, args[i]);
        }

        return key;
    }

    /**
     * Opens a media browser window and registers a listener for communication between editor and browser windows
     *
     * @param {String} url
     * @param {Function} call
     * @param {String} [name = 'browser']
     * @param {Object.<String, String>} [opts = {}]
     */
    browser(url, call, name = 'browser', opts = {}) {
        if (!url || typeof call !== 'function' || !name) {
            return;
        }

        const base = {height: `${this.window.screen.height}`, width: `${this.window.screen.width}`};
        const merged = Object.assign(base, configBrowser, opts);
        const features = Object.entries(merged).map(x => `${x[0]}=${x[1]}`).join(',');
        const win = this.window.open(url, name, features);
        const a = this.createElement('a', {href: url});
        const origin = a.origin;

        this.window.addEventListener('message', ev => {
            if (ev.origin === origin && ev.source === win) {
                call(ev.data);
                win.close();
            }
        }, false);
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
        if (config.lang) {
            config.i18n = i18n[config.lang] || {};
        }

        const editor = new Editor(element, config);
        editor.init();

        return editor;
    }
}
