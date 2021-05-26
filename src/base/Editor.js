import Browser from './Browser.js';
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
    #orig;

    /**
     * Allows read access to corresponding DOM element of the source
     *
     * @return {HTMLElement}
     */
    get orig() {
        return this.#orig;
    }

    /**
     * Correspondig DOM Document
     *
     * @type {Document}
     */
    #document;

    /**
     * Allows read access to correspondig DOM Document
     *
     * @return {Document}
     */
    get document() {
        return this.#document;
    }

    /**
     * Corresponding Window object
     *
     * @type {Window}
     */
    #window;

    /**
     * Allows read access to corresponding Window object
     *
     * @return {Window}
     */
    get window() {
        return this.#window;
    }

    /**
     * Corresponding DOM element of the editor
     *
     * @type {HTMLElement}
     */
    #element;

    /**
     * Allows read access to corresponding DOM element of the editor
     *
     * @return {HTMLElement}
     */
    get element() {
        return this.#element;
    }

    /**
     * Corresponding DOM element of the main toolbar
     *
     * @type {HTMLElement}
     */
    #toolbar;

    /**
     * Allows read access to corresponding DOM element of the main toolbar
     *
     * @return {HTMLElement}
     */
    get toolbar() {
        return this.#toolbar;
    }

    /**
     * Event dispatcher of the editor main toolbar
     *
     * @type {Dispatcher}
     */
    #toolbarEvents;

    /**
     * Allows read access to event dispatcher of the editor main toolbar
     *
     * @return {Dispatcher}
     */
    get toolbarEvents() {
        return this.#toolbarEvents;
    }

    /**
     * Corresponding DOM element of the formats toolbar
     *
     * @type {HTMLElement}
     */
    #formats;

    /**
     * Allows read access to corresponding DOM element of the formats toolbar
     *
     * @return {HTMLElement}
     */
    get formats() {
        return this.#formats;
    }

    /**
     * Event dispatcher of the editor formats toolbar
     *
     * @type {Dispatcher}
     */
    #formatsEvents;

    /**
     * Allows read access to event dispatcher of the editor formats toolbar
     *
     * @return {Dispatcher}
     */
    get formatsEvents() {
        return this.#formatsEvents;
    }

    /**
     * Corresponding DOM element of the editor content root
     *
     * @type {HTMLElement}
     */
    #root;

    /**
     * Allows read access to corresponding DOM element of the editor content root
     *
     * @return {HTMLElement}
     */
    get root() {
        return this.#root;
    }

    /**
     * Event dispatcher of the editor content root
     *
     * @type {Dispatcher}
     */
    #rootEvents;

    /**
     * Allows read access to event dispatcher of the editor content root
     *
     * @return {Dispatcher}
     */
    get rootEvents() {
        return this.#rootEvents;
    }

    /**
     * Configuration
     *
     * @type {Object}
     */
    #config = {};

    /**
     * Allows read access to configuration
     *
     * @return {Object}
     */
    get config() {
        return this.#config;
    }

    /**
     * Translator
     *
     * @type {Translator}
     */
    #translator = new Translator();

    /**
     * Allows read access to translator
     *
     * @return {Translator}
     */
    get translator() {
        return this.#translator;
    }

    /**
     * Tag manager
     *
     * @type {TagManager}
     */
    #tags = new TagManager();

    /**
     * Allows read access to tag manager
     *
     * @return {TagManager}
     */
    get tags() {
        return this.#tags;
    }

    /**
     * Filter manager
     *
     * @type {FilterManager}
     */
    #filters = new FilterManager();

    /**
     * Allows read access to filter manager
     *
     * @return {FilterManager}
     */
    get filters() {
        return this.#filters;
    }

    /**
     * Dialog manager
     *
     * @type {DialogManager}
     */
    #dialogs = new DialogManager();

    /**
     * Allows read access to dialog manager
     *
     * @type {DialogManager}
     */
    get dialogs() {
        return this.#dialogs;
    }

    /**
     * Command manager
     *
     * @type {CommandManager}
     */
    #commands = new CommandManager();

    /**
     * Allows read access to command manager
     *
     * @return {CommandManager}
     */
    get commands() {
        return this.#commands;
    }

    /**
     * Plugin manager
     *
     * @type {PluginManager}
     */
    #plugins = new PluginManager();

    /**
     * Allows read access to plugin manager
     *
     * @return {PluginManager}
     */
    get plugins() {
        return this.#plugins;
    }

    /**
     * Browser manager
     *
     * @type {Browser}
     */
    #browser;

    /**
     * Allows read access to browser manager
     *
     * @return {Browser}
     */
    get browser() {
        return this.#browser;
    }

    /**
     * Default configuration
     *
     * @type {Object.<string, Object>}
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

        this.#orig = orig;
        this.#document = this.orig.ownerDocument;
        this.#window = this.document.defaultView;
        this.#element = this.createElement('akilli-editor');
        this.#toolbar = this.createElement('editor-toolbar', {attributes: {role: 'toolbar'}});
        this.element.appendChild(this.toolbar);
        this.#toolbarEvents = new Dispatcher(this.toolbar);
        this.#formats = this.createElement('editor-formats', {attributes: {role: 'toolbar'}});
        this.formats.hidden = true;
        this.element.appendChild(this.formats);
        this.#formatsEvents = new Dispatcher(this.formats);
        this.#root = this.createElement('editor-root');
        this.element.appendChild(this.root);
        this.#rootEvents = new Dispatcher(this.root);
        this.#config = config;
        this.#browser = new Browser(this);
    }

    /**
     * Initializes plugins and configuration
     *
     * @return {void}
     */
    init() {
        const config = this.config;
        this.#config = {};
        const builtin = this.constructor.defaultConfig.base?.plugins || [];
        let configured = builtin;

        if (Array.isArray(config.base?.plugins) && config.base.plugins.length > 0) {
            configured = [];
            config.base.plugins.forEach(item => {
                const p = builtin.find(i => i.name === item);
                p && configured.push(p);
            });
        }

        const plugins = new Set();
        const add = item => {
            item.dependencies?.forEach(add);
            plugins.add(item);
        };
        configured.map(add);
        plugins.forEach(item => {
            Object.entries(item.config).forEach(([key, val]) => {
                this.config[item.name] ??= {};
                this.config[item.name][key] = config[item.name]?.[key]
                    || this.constructor.defaultConfig[item.name]?.[key]
                    || val;
            });
            this.plugins.set(new item(this));
        });
        this.plugins.init();
        this.toolbarEvents.dispatch('init');
        this.formatsEvents.dispatch('init');
        this.rootEvents.dispatch('init');
    }

    /**
     * Freezes the editor and its configuration
     */
    freeze() {
        Object.freeze(this.config);
        this.translator.freeze();
        this.tags.freeze();
        this.filters.freeze();
        this.dialogs.freeze();
        this.commands.freeze();
        this.plugins.freeze();
    }

    /**
     * Loads editor element into DOM
     *
     * @return {void}
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
     *
     * @return {void}
     */
    destroy() {
        this.element.parentElement.removeChild(this.element);
        this.orig.hidden = false;
    }

    /**
     * Returns editor content root element's innerHTML
     *
     * @return {string}
     */
    getHtml() {
        const root = this.createElement(this.root.localName, {html: this.root.innerHTML});
        this.filters.filter(root);
        this.rootEvents.dispatch('gethtml', root);

        return root.innerHTML;
    }

    /**
     * Sets editor content root element's innerHTML
     *
     * @param {string} html
     * @return {void}
     */
    setHtml(html) {
        const root = this.createElement(this.root.localName, {html: html});
        this.rootEvents.dispatch('sethtml', root);
        this.filters.filter(root);
        this.root.innerHTML = root.innerHTML;
    }

    /**
     * Saves editor data to source element
     *
     * @return {void}
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
     * @return {void}
     */
    insert(element) {
        if (!(element instanceof HTMLElement)) {
            throw 'Invalid argument';
        }

        const editable = this.getSelectedEditable();

        if (editable && editable instanceof HTMLSlotElement && this.tags.allowed(editable.parentElement, element)) {
            editable.insertAdjacentElement('beforebegin', element);
        } else if (editable) {
            this.closest(editable, element)?.insertAdjacentElement('afterend', element);

            if (editable.hasAttribute('data-deletable') && !editable.textContent.trim()) {
                editable.parentElement.removeChild(editable);
            }
        } else if (this.tags.allowed(this.root, element)) {
            this.root.appendChild(element);
        } else {
            throw 'Invalid argument';
        }
    }

    /**
     * Inserts text
     *
     * @param {string} text
     * @return {void}
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
     * @return {void}
     */
    format(element) {
        if (!(element instanceof HTMLElement)) {
            throw 'Invalid argument';
        }

        const sel = this.window.getSelection();
        const range = sel.rangeCount > 0 ? sel.getRangeAt(0) : null;
        const editable = this.getSelectedEditable();

        if (!range
            || range.collapsed
            || !range.toString().trim()
            || !editable
            || !this.tags.allowed(editable, element)
        ) {
            return;
        }

        if (range.startContainer instanceof Text && range.startContainer.parentElement !== editable) {
            range.setStartBefore(range.startContainer.parentElement);
        }

        if (range.endContainer instanceof Text && range.endContainer.parentElement !== editable) {
            range.setEndAfter(range.endContainer.parentElement);
        }

        const selText = range.toString();
        const same = Array.from(range.cloneContents().childNodes).every(
            item => item instanceof Text && !item.textContent.trim()
                || item instanceof HTMLElement && item.localName === element.localName,
        );
        range.deleteContents();

        if (same) {
            range.insertNode(this.createText(selText));
        } else {
            element.textContent = selText;
            range.insertNode(element);
        }

        editable.normalize();
    }

    /**
     * Indicates if element allows arbitrary amount of child elements
     *
     * @param {Element} element
     * @return {boolean}
     */
    arbitrary(element) {
        return element instanceof HTMLElement && (element === this.root || element.hasAttribute('data-arbitrary'));
    }

    /**
     * Returns first ancestor of given element whose parent element allows creating given child tag name or element,
     * i.e. the returned element is the sibling element to add the new child before or after
     *
     * @param {HTMLElement} element
     * @param {string|HTMLElement} child
     * @return {?HTMLElement}
     */
    closest(element, child) {
        if (!(element instanceof HTMLElement) || !this.contains(element.parentElement)) {
            throw 'Invalid argument';
        }

        let sibling = element;
        let parent = element.parentElement;

        do {
            if (this.arbitrary(parent) && this.tags.allowed(parent, child)) {
                return sibling;
            }
        } while ((sibling = parent) && (parent = parent.parentElement) && this.contains(parent));

        return null;
    }

    /**
     * Wraps element with given parent if necessary and allowed
     *
     * @param {HTMLElement} element
     * @param {string} name
     * @param {Object} [opts = {}]
     * @return {void}
     */
    wrap(element, name, opts = {}) {
        let sibling;

        if (!(element instanceof HTMLElement)) {
            throw 'Invalid argument';
        } else if (element.parentElement.localName !== name && (sibling = this.closest(element, name))) {
            const target = this.createElement(name, opts);
            sibling.insertAdjacentElement('afterend', target);
            target.appendChild(element);
        }
    }

    /**
     * Indicates if given element is contained by editor content root or by a clone of it
     *
     * @param {HTMLElement} element
     * @return {boolean}
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
     * @param {string} name
     * @param {function} constructor
     * @param {?string} [parentName = null]
     * @return {void}
     */
    registerElement(name, constructor, parentName = null) {
        if (typeof this.window.customElements.get(name) === 'undefined') {
            this.window.customElements.define(name, constructor, parentName ? {extends: parentName} : null);
        }
    }

    /**
     * Creates HTML element in editor document
     *
     * @param {string} name
     * @param {Object.<string, string>} [attributes = {}]
     * @param {string} [html = '']
     * @return {HTMLElement}
     */
    createElement(name, {attributes = {}, html = ''} = {}) {
        const element = this.document.createElement(name);
        element.innerHTML = html;
        Object.entries(attributes).forEach(([key, val]) => val && element.setAttribute(key, `${val}`));

        return element;
    }

    /**
     * Creates text node in editor document
     *
     * @param {string} text
     * @return {Text}
     */
    createText(text) {
        return this.document.createTextNode(text);
    }

    /**
     * Returns current selected element
     *
     * @return {?HTMLElement}
     */
    getSelectedElement() {
        try {
            const sel = this.window.getSelection();
            const anc = sel.anchorNode instanceof Text ? sel.anchorNode.parentElement : sel.anchorNode;
            const foc = sel.focusNode instanceof Text ? sel.focusNode.parentElement : sel.focusNode;

            if (anc instanceof HTMLElement && foc instanceof HTMLElement && anc === foc && this.contains(anc)) {
                return anc;
            }
        } catch (e) {
            this.window.console.error(e);
        }

        return null;
    }

    /**
     * Returns current selected contenteditable
     *
     * @return {?HTMLElement}
     */
    getSelectedEditable() {
        try {
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
        } catch (e) {
            this.window.console.error(e);
        }

        return null;
    }

    /**
     * Focus end of contents
     *
     * @param {HTMLElement} element
     * @return {void}
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
     * @param {string|string[]} key
     * @param {boolean} alt
     * @param {boolean} ctrl
     * @param {boolean} shift
     * @return {boolean}
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
     * @param {string} url
     * @return {string}
     */
    url(url) {
        const origin = this.window.origin || this.window.location.origin;
        /** @type {HTMLAnchorElement} */
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
        editor.freeze();
        editor.load();

        return editor;
    }
}
