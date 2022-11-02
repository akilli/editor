import CommandManager from './CommandManager.js';
import DialogManager from './DialogManager.js';
import Dispatcher from './Dispatcher.js';
import Dom from './Dom.js';
import FilterManager from './FilterManager.js';
import PluginManager from './PluginManager.js';
import TagManager from './TagManager.js';
import TagName from './TagName.js';

export default class Editor {
    /**
     * @type {HTMLElement}
     */
    #orig;

    /**
     * @return {HTMLElement}
     */
    get orig() {
        return this.#orig;
    }

    /**
     * @type {Object}
     */
    #config = {};

    /**
     * @return {Object}
     */
    get config() {
        return this.#config;
    }

    /**
     * @type {Dom}
     */
    #dom;

    /**
     * @return {Dom}
     */
    get dom() {
        return this.#dom;
    }

    /**
     * @type {HTMLElement}
     */
    #element;

    /**
     * @return {HTMLElement}
     */
    get element() {
        return this.#element;
    }

    /**
     * @type {HTMLElement}
     */
    #toolbar;

    /**
     * @return {HTMLElement}
     */
    get toolbar() {
        return this.#toolbar;
    }

    /**
     * @type {Dispatcher}
     */
    #toolbarDispatcher;

    /**
     * @return {Dispatcher}
     */
    get toolbarDispatcher() {
        return this.#toolbarDispatcher;
    }

    /**
     * @type {HTMLElement}
     */
    #formatbar;

    /**
     * @return {HTMLElement}
     */
    get formatbar() {
        return this.#formatbar;
    }

    /**
     * @type {Dispatcher}
     */
    #formatbarDispatcher;

    /**
     * @return {Dispatcher}
     */
    get formatbarDispatcher() {
        return this.#formatbarDispatcher;
    }

    /**
     * @type {HTMLElement}
     */
    #focusbar;

    /**
     * @return {HTMLElement}
     */
    get focusbar() {
        return this.#focusbar;
    }

    /**
     * @type {Dispatcher}
     */
    #focusbarDispatcher;

    /**
     * @return {Dispatcher}
     */
    get focusbarDispatcher() {
        return this.#focusbarDispatcher;
    }

    /**
     * @type {HTMLElement}
     */
    #root;

    /**
     * @return {HTMLElement}
     */
    get root() {
        return this.#root;
    }

    /**
     * @type {Dispatcher}
     */
    #rootDispatcher;

    /**
     * @return {Dispatcher}
     */
    get rootDispatcher() {
        return this.#rootDispatcher;
    }

    /**
     * @type {Object.<string, string>}
     */
    #i18n = {};

    /**
     * @return {Object.<string, string>}
     */
    get i18n() {
        return this.#i18n;
    }

    /**
     * @param {Object.<string, string>} i18n
     * @return {void}
     */
    set i18n(i18n) {
        this.#i18n = { ...this.#i18n, ...(i18n || {}) };
    }

    /**
     * @type {TagManager}
     */
    #tags = new TagManager();

    /**
     * @return {TagManager}
     */
    get tags() {
        return this.#tags;
    }

    /**
     * @type {FilterManager}
     */
    #filters = new FilterManager();

    /**
     * @return {FilterManager}
     */
    get filters() {
        return this.#filters;
    }

    /**
     * @type {DialogManager}
     */
    #dialogs = new DialogManager();

    /**
     * @type {DialogManager}
     */
    get dialogs() {
        return this.#dialogs;
    }

    /**
     * @type {CommandManager}
     */
    #commands = new CommandManager();

    /**
     * @return {CommandManager}
     */
    get commands() {
        return this.#commands;
    }

    /**
     * @type {PluginManager}
     */
    #plugins = new PluginManager();

    /**
     * @return {PluginManager}
     */
    get plugins() {
        return this.#plugins;
    }

    /**
     * @type {Object.<string, Object>}
     */
    static get defaultConfig() {
        return {};
    }

    /**
     * @param {HTMLElement} orig
     * @param {Object} [config = {}]
     */
    constructor(orig, config = {}) {
        if (!(orig instanceof HTMLElement) || !(config instanceof Object)) {
            throw new TypeError('Invalid argument');
        }

        this.#orig = orig;
        this.#config = config;
        this.#dom = new Dom(this, this.orig.ownerDocument);
        this.#element = this.dom.createElement(TagName.EDITOR);

        this.#toolbar = this.dom.createElement(TagName.TOOLBAR, { attributes: { role: 'toolbar' } });
        this.dom.insertLastChild(this.toolbar, this.element);
        this.#toolbarDispatcher = new Dispatcher(this.toolbar);

        this.#formatbar = this.dom.createElement(TagName.FORMATBAR, { attributes: { role: 'toolbar' } });
        this.formatbar.hidden = true;
        this.dom.insertLastChild(this.formatbar, this.element);
        this.#formatbarDispatcher = new Dispatcher(this.formatbar);

        this.#focusbar = this.dom.createElement(TagName.FOCUSBAR, { attributes: { role: 'toolbar' } });
        this.focusbar.hidden = true;
        this.dom.insertLastChild(this.focusbar, this.element);
        this.#focusbarDispatcher = new Dispatcher(this.focusbar);

        this.#root = this.dom.createElement(TagName.ROOT);
        this.dom.insertLastChild(this.root, this.element);
        this.#rootDispatcher = new Dispatcher(this.root);
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
            const p = config.base.plugins;

            if (!config.base?.pluginsDisabled) {
                configured = [];
                p.forEach((item) => {
                    const b = builtin.find((i) => i.name === item);
                    b && configured.push(b);
                });
            } else {
                configured = configured.filter((i) => !p.includes(i.name));
            }
        }

        const plugins = new Set();
        const add = (item) => {
            item.dependencies?.forEach(add);
            plugins.add(item);
        };
        configured.map(add);
        plugins.forEach((item) => {
            Object.entries(item.config).forEach(([key, val]) => {
                this.config[item.name] ??= {};
                this.config[item.name][key] =
                    config[item.name]?.[key] || this.constructor.defaultConfig[item.name]?.[key] || val;
            });
            this.plugins.set(new item(this));
        });

        if (this.config.base.lang) {
            this.element.lang = this.config.base.lang;
        }

        this.plugins.init();
        this.toolbarDispatcher.dispatch('init');
        this.formatbarDispatcher.dispatch('init');
        this.focusbarDispatcher.dispatch('init');
        this.rootDispatcher.dispatch('init');
    }

    /**
     * Freezes the editor and its configuration
     *
     * @return {void}
     */
    freeze() {
        Object.freeze(this.config);
        Object.freeze(this.i18n);
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

        this.dom.insertAfter(this.element, this.orig);
        this.orig.hidden = true;
        this.rootDispatcher.dispatch('load');
    }

    /**
     * Removes editor element from DOM
     *
     * @return {void}
     */
    destroy() {
        this.element.parentElement.removeChild(this.element);
        this.orig.hidden = false;
        this.rootDispatcher.dispatch('destroy');
    }

    /**
     * Returns editor content root element's innerHTML
     *
     * @return {string}
     */
    getHtml() {
        const root = this.dom.createElement(this.root.localName, { html: this.root.innerHTML });
        this.filters.filter(root);
        this.rootDispatcher.dispatch('gethtml', root);

        return root.innerHTML;
    }

    /**
     * Sets editor content root element's innerHTML
     *
     * @param {string} html
     * @return {void}
     */
    setHtml(html) {
        const root = this.dom.createElement(this.root.localName, { html });
        this.rootDispatcher.dispatch('sethtml', root);
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

        this.rootDispatcher.dispatch('save');
    }

    /**
     * @param {string} key
     * @return {string}
     */
    translate(key) {
        return this.i18n[key] || key;
    }

    /**
     * Returns relative or absolute URL depending on its origin
     *
     * @param {string} url
     * @return {string}
     */
    url(url) {
        const origin = this.dom.window.origin || this.dom.window.location.origin;
        /** @type {HTMLAnchorElement} */
        const a = this.dom.createElement(TagName.A, { attributes: { href: url } });

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
