import CommandManager from './CommandManager.js';
import DialogManager from './DialogManager.js';
import Dispatcher from './Dispatcher.js';
import Dom from './Dom.js';
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
     * DOM manager
     *
     * @type {Dom}
     */
    #dom;

    /**
     * Allows read access to DOM manager
     *
     * @return {Dom}
     */
    get dom() {
        return this.#dom;
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
    #toolbarDispatcher;

    /**
     * Allows read access to event dispatcher of the editor main toolbar
     *
     * @return {Dispatcher}
     */
    get toolbarDispatcher() {
        return this.#toolbarDispatcher;
    }

    /**
     * Corresponding DOM element of the format bar
     *
     * @type {HTMLElement}
     */
    #formatbar;

    /**
     * Allows read access to corresponding DOM element of the format bar
     *
     * @return {HTMLElement}
     */
    get formatbar() {
        return this.#formatbar;
    }

    /**
     * Event dispatcher of the editor format bar
     *
     * @type {Dispatcher}
     */
    #formatbarDispatcher;

    /**
     * Allows read access to event dispatcher of the editor format bar
     *
     * @return {Dispatcher}
     */
    get formatbarDispatcher() {
        return this.#formatbarDispatcher;
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
    #rootDispatcher;

    /**
     * Allows read access to event dispatcher of the editor content root
     *
     * @return {Dispatcher}
     */
    get rootDispatcher() {
        return this.#rootDispatcher;
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
        this.#config = config;
        this.#dom = new Dom(this, this.orig.ownerDocument);
        this.#element = this.dom.createElement('akilli-editor');
        this.#toolbar = this.dom.createElement('editor-toolbar', { attributes: { role: 'toolbar' } });
        this.element.appendChild(this.toolbar);
        this.#toolbarDispatcher = new Dispatcher(this.toolbar);
        this.#formatbar = this.dom.createElement('editor-formatbar', { attributes: { role: 'toolbar' } });
        this.formatbar.hidden = true;
        this.element.appendChild(this.formatbar);
        this.#formatbarDispatcher = new Dispatcher(this.formatbar);
        this.#root = this.dom.createElement('editor-root');
        this.element.appendChild(this.root);
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
        this.toolbarDispatcher.dispatch('init');
        this.formatbarDispatcher.dispatch('init');
        this.rootDispatcher.dispatch('init');
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
        const root = this.dom.createElement(this.root.localName, { html: html });
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
        const a = this.dom.createElement('a', { attributes: { href: url } });

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
