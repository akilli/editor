import CommandMap from './CommandMap.js';
import DialogMap from './DialogMap.js';
import FilterMap from './FilterMap.js';
import I18nMap from './I18nMap.js';
import Observer from './Observer.js';
import PluginMap from './PluginMap.js';
import TagMap from './TagMap.js';

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
     * Window origin
     *
     * @type {String}
     */
    origin;

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
     * Corresponding DOM element of the editor content
     *
     * @type {HTMLElement}
     */
    content;

    /**
     * Configuration
     *
     * @type {Object}
     */
    config = {};

    /**
     * I18n
     *
     * @type {I18nMap}
     */
    i18n = new I18nMap();

    /**
     * Tags
     *
     * @type {TagMap}
     */
    tags = new TagMap();

    /**
     * Filters
     *
     * @type {FilterMap}
     */
    filters = new FilterMap();

    /**
     * Dialogs
     *
     * @type {DialogMap}
     */
    dialogs = new DialogMap();

    /**
     * Commands
     *
     * @type {CommandMap}
     */
    commands = new CommandMap();

    /**
     * Plugins
     *
     * @type {PluginMap}
     */
    plugins = new PluginMap();

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
        this.origin = this.window.origin || this.window.location.origin;
        this.toolbar = this.createElement('editor-toolbar', {attributes: {role: 'toolbar'}});
        this.content = this.createElement('editor-content');
        this.element = this.createElement('akilli-editor');
        this.element.appendChild(this.toolbar);
        this.element.appendChild(this.content);
        this.config = config;
    }

    /**
     * Initializes editor
     */
    init() {
        if (this.plugins.size === 0) {
            this.initConfig();
            this.initPlugins();
            this.initToolbar();
        }

        this.initContent();
        this.initDom();
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
        this.plugins.init();
    }

    /**
     * Initializes Toolbar
     *
     * @private
     */
    initToolbar() {
        this.config.base.toolbar.forEach(item => this.toolbar.appendChild(this.createElement('button', {
            attributes: {type: 'button', 'data-command': item, title: item},
            html: item,
        })));
    }

    /**
     * Initializes content
     *
     * @private
     */
    initContent() {
        if (this.orig instanceof HTMLTextAreaElement) {
            this.orig.form.addEventListener('submit', () => this.save());
            this.setHtml(this.orig.value.replace('/&nbsp;/g', ' '));
        } else {
            this.setHtml(this.orig.innerHTML);
        }
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
    getHtml() {
        const content = this.content.cloneNode(true);
        this.filters.filter(content);

        return content.innerHTML;
    }

    /**
     * Sets editor content element's innerHTML
     *
     * @param {String} html
     */
    setHtml(html) {
        const content = this.content.cloneNode(false);
        content.innerHTML = html;
        this.filters.filter(content);
        this.content.innerHTML = content.innerHTML;
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

        if (editable && editable instanceof HTMLSlotElement && this.tags.isAllowed(element, editable.parentElement)) {
            editable.insertAdjacentElement('beforebegin', element);
        } else if (this.tags.isAllowed(element, this.content)) {
            this.content.appendChild(element);
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
        let same = Array.from(selNodes).every(item =>
            item instanceof Text && !item.textContent.trim()
            || item instanceof HTMLElement && item.localName === element.localName
        );

        range.deleteContents();

        if (parent.isContentEditable && this.tags.isAllowed(element, parent) && selText.trim() && (!tag || !same)) {
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
     * @param {String} [html = '']
     * @param {String} [is = null]
     * @return {HTMLElement}
     */
    createElement(name, {attributes = {}, html = '', is = null} = {}) {
        const element = this.document.createElement(name, is ? {is: is} : null);
        element.innerHTML = html;

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

        return anc instanceof HTMLElement && foc instanceof HTMLElement && anc === foc && this.content.contains(anc) ? anc : null;
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

            if (ancEdit instanceof HTMLElement && ancEdit === focEdit && this.content.contains(ancEdit)) {
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
     * Indicates if given element is the editor content element
     *
     * @param {HTMLElement} element
     * @return {Boolean}
     */
    isContent(element) {
        if (!(element instanceof HTMLElement)) {
            throw 'Invalid argument';
        }

        return element === this.content || element.localName === this.content.localName;
    }

    /**
     * Returns relative or absolute URL depending on its origin
     *
     * @param {String} url
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
     * @return {Editor}
     */
    static create(element, config = {}) {
        const editor = new this(element, config);
        editor.init();

        return editor;
    }
}
