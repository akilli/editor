import CommandManager from './CommandManager.js';
import DialogManager from './DialogManager.js';
import Dispatcher from './Dispatcher.js';
import FilterManager from './FilterManager.js';
import PluginManager from './PluginManager.js';
import TagManager from './TagManager.js';
import Translator from './Translator.js';

/**
 * Base Editor
 */
export default class Editor {
    /**
     * Corresponding DOM element of the source
     *
     * @type {HTMLElement}
     */
    orig;

    /**
     * Correspondig DOM Document
     *
     * @type {Document}
     */
    document;

    /**
     * Corresponding Window object
     *
     * @type {Window}
     */
    window;

    /**
     * Corresponding DOM element of the editor
     *
     * @type {HTMLElement}
     */
    element;

    /**
     * Corresponding DOM element of the main toolbar
     *
     * @type {HTMLElement}
     */
    toolbar;

    /**
     * Corresponding DOM element of the editor content root
     *
     * @type {HTMLElement}
     */
    root;

    /**
     * Event dispatcher of the editor toolbar
     *
     * @type {Dispatcher}
     */
    toolbarEvents;

    /**
     * Event dispatcher of the editor content root
     *
     * @type {Dispatcher}
     */
    rootEvents;

    /**
     * Configuration
     *
     * @type {Object}
     */
    config = {};

    /**
     * Translator
     *
     * @type {Translator}
     */
    translator = new Translator();

    /**
     * Tags
     *
     * @type {TagManager}
     */
    tags = new TagManager();

    /**
     * Filters
     *
     * @type {FilterManager}
     */
    filters = new FilterManager();

    /**
     * Dialogs
     *
     * @type {DialogManager}
     */
    dialogs = new DialogManager();

    /**
     * Commands
     *
     * @type {CommandManager}
     */
    commands = new CommandManager();

    /**
     * Plugins
     *
     * @type {PluginManager}
     */
    plugins = new PluginManager();

    /**
     * Default configuration
     *
     * @type {Object.<String, Object>}
     */
    static get defaultConfig() {
        return {};
    }

    /**
     * Creates a new instance of editor with given configuration
     *
     * @param {HTMLElement} orig
     * @param {Object} [config = {}]
     */
    constructor(orig, config = {}) {
        if (!(orig instanceof HTMLElement) || !(config instanceof Object)) {
            throw 'Invalid argument';
        }

        this.orig = orig;
        this.document = this.orig.ownerDocument;
        this.window = this.document.defaultView;
        this.toolbar = this.createElement('editor-toolbar', {attributes: {role: 'toolbar'}});
        this.root = this.createElement('editor-root');
        this.element = this.createElement('akilli-editor');
        this.element.appendChild(this.toolbar);
        this.element.appendChild(this.root);
        this.toolbarEvents = new Dispatcher(this.toolbar);
        this.rootEvents = new Dispatcher(this.root);
        this.config = config;
    }

    /**
     * Initializes plugins and configuration
     */
    init() {
        const config = this.config;
        const configured = config.base?.plugins || this.constructor.defaultConfig.base?.plugins || [];
        const disabled = config.base?.pluginsDisabled || [];
        const plugins = new Set();
        const add = (item, dependency = false) => {
            if (plugins.has(item) || !dependency && disabled.includes(item.name)) {
                return;
            }

            if (item.dependencies) {
                item.dependencies.forEach(i => add(i, true));
            }

            plugins.add(item);
        };
        this.config = {};
        configured.map(item => add(item));
        plugins.forEach(item => {
            Object.entries(item.config).forEach(([key, val]) => {
                if (!this.config.hasOwnProperty(item.name)) {
                    this.config[item.name] = {};
                }

                this.config[item.name][key] = config[item.name]?.[key] || this.constructor.defaultConfig[item.name]?.[key] || val;
            });
            this.plugins.set(new item(this));
        });
        this.plugins.init();
    }

    /**
     * Loads editor element into DOM
     */
    load() {
        if (this.orig instanceof HTMLTextAreaElement) {
            this.orig.form.addEventListener('submit', () => this.save());
            this.setHtml(this.orig.value.replace('/&nbsp;/g', ' '));
        } else {
            this.setHtml(this.orig.innerHTML);
        }

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
     * Returns editor content root element's innerHTML
     *
     * @return {String}
     */
    getHtml() {
        const root = this.createElement(this.root.localName, {html: this.root.innerHTML});
        this.filters.filter(root);
        this.rootEvents.dispatch('gethtml', root, this.root);

        return root.innerHTML;
    }

    /**
     * Sets editor content root element's innerHTML
     *
     * @param {String} html
     */
    setHtml(html) {
        const root = this.createElement(this.root.localName, {html: html});
        this.rootEvents.dispatch('sethtml', root, this.root);
        this.filters.filter(root);
        this.root.innerHTML = root.innerHTML;
    }

    /**
     * Saves editor data to source element
     */
    save() {
        if (this.orig instanceof HTMLTextAreaElement) {
            this.orig.value = this.getHtml();
        } else {
            this.orig.innerHTML = this.getHtml();
        }
    }

    /**
     * Inserts element
     *
     * @param {HTMLElement} element
     */
    insert(element) {
        if (!(element instanceof HTMLElement)) {
            throw 'Invalid argument';
        }

        const editable = this.getSelectedEditable();

        if (editable && editable instanceof HTMLSlotElement && this.tags.allowed(editable.parentElement, element)) {
            editable.insertAdjacentElement('beforebegin', element);
        } else if (this.tags.allowed(this.root, element)) {
            this.root.appendChild(element);
        } else {
            throw 'Invalid argument';
        }
    }

    /**
     * Inserts text
     *
     * @param {String} text
     */
    insertText(text) {
        const editable = this.getSelectedEditable();

        if (editable) {
            const range = this.window.getSelection().getRangeAt(0);
            range.deleteContents();
            range.insertNode(this.createText(text));
            range.collapse();
            editable.normalize();
        }
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
        const tag = this.tags.get(anc);
        const parent = !tag || tag.group === 'format' ? anc.parentElement : anc;

        if (range.startContainer instanceof Text && range.startContainer.parentElement !== parent) {
            range.setStartBefore(range.startContainer.parentElement);
        }

        if (range.endContainer instanceof Text && range.endContainer.parentElement !== parent) {
            range.setEndAfter(range.endContainer.parentElement);
        }

        const selText = range.toString();
        const selNodes = range.cloneContents().childNodes;
        const same = Array.from(selNodes).every(item =>
            item instanceof Text && !item.textContent.trim()
            || item instanceof HTMLElement && item.localName === element.localName
        );

        range.deleteContents();

        if (parent.isContentEditable && this.tags.allowed(parent, element) && selText.trim() && (!tag || !same)) {
            element.textContent = selText;
            range.insertNode(element);
        } else {
            range.insertNode(this.createText(selText));
        }

        parent.normalize();
    }

    /**
     * Creates a new element with given name and options below first ancestor of given element that allows creating it
     *
     * @param {HTMLElement} element
     * @param {String} name
     * @param {Object} [opts = {}]
     * @return {?HTMLElement}
     */
    closest(element, name, opts = {}) {
        if (!(element instanceof HTMLElement) || !this.contains(element.parentElement)) {
            throw 'Invalid argument';
        }

        let prev = element;
        let current = element.parentElement;

        do {
            if (this.tags.allowed(current, name)) {
                const target = this.createElement(name, opts);
                prev.insertAdjacentElement('afterend', target);
                return target;
            }
        } while ((prev = current) && (current = current.parentElement) && this.contains(current));

        return null;
    }

    /**
     * Wraps element with given parent if necessary and allowed
     *
     * @param {HTMLElement} element
     * @param {String} name
     * @param {Object} [opts = {}]
     */
    wrap(element, name, opts = {}) {
        let target;

        if (!(element instanceof HTMLElement)) {
            throw 'Invalid argument';
        } else if (element.parentElement.localName !== name && (target = this.closest(element, name, opts))) {
            target.appendChild(element);
        }
    }

    /**
     * Indicates if given element is contained by editor content root or by a clone of it
     *
     * @param {HTMLElement} element
     * @return {Boolean}
     */
    contains(element) {
        if (!(element instanceof HTMLElement)) {
            throw 'Invalid argument';
        }

        return this.root.contains(element) || element.closest(this.root.localName)?.parentElement === null;
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
     * @param {String} [html = '']
     * @return {HTMLElement}
     */
    createElement(name, {attributes = {}, html = ''} = {}) {
        const element = this.document.createElement(name);
        element.innerHTML = html;
        Object.entries(attributes).forEach(([key, val]) => {
            if (val) {
                element.setAttribute(key, `${val}`);
            }
        })

        return element;
    }

    /**
     * Creates text node in editor document
     *
     * @param {String} text
     * @return {Text}
     */
    createText(text) {
        return this.document.createTextNode(text);
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

        return anc instanceof HTMLElement && foc instanceof HTMLElement && anc === foc && this.contains(anc) ? anc : null;
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

            if (ancEdit instanceof HTMLElement && ancEdit === focEdit && this.contains(ancEdit)) {
                return ancEdit;
            }
        }

        return null;
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
     * Indicates if keyboard event was triggered for given key combination
     *
     * @param {KeyboardEvent} event
     * @param {String|String[]} key
     * @param {Boolean} alt
     * @param {Boolean} ctrl
     * @param {Boolean} shift
     * @return {Boolean}
     */
    isKey(event, key, {alt = false, ctrl = false, shift = false} = {}) {
        return (Array.isArray(key) && key.includes(event.key) || event.key === key)
            && event.altKey === alt
            && event.ctrlKey === ctrl
            && event.shiftKey === shift;
    }

    /**
     * Returns relative or absolute URL depending on its origin
     *
     * @param {String} url
     * @return {String}
     */
    url(url) {
        const origin = this.window.origin || this.window.location.origin;
        const a = this.createElement('a', {attributes: {href: url}});

        return origin === a.origin ? a.pathname : a.href;
    }

    /**
     * Factory method to create a new editor instance with given configuration
     *
     * @param {HTMLElement} element
     * @param {Object} [config = {}]
     * @return {Editor}
     */
    static create(element, config = {}) {
        const editor = new this(element, config);
        editor.init();
        editor.load();

        return editor;
    }
}
