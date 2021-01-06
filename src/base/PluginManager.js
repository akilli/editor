import Plugin from './Plugin.js';

/**
 * Plugin Manager
 */
export default class PluginManager {
    /**
     * Registered plugins
     *
     * @type {Map<String, Plugin>}
     */
    #items = new Map();

    /**
     * Initializes a new plugin map
     *
     * @param {Plugin[]} [plugins = []]
     */
    constructor(plugins = []) {
        plugins.forEach(plugin => this.set(plugin));
    }

    /**
     * Returns registered plugin with given name or null
     *
     * @param {String} name
     * @return {?Plugin}
     */
    get(name) {
        return this.#items.get(name) || null;
    }

    /**
     * Adds or updates a plugin
     *
     * @param {Plugin} plugin
     */
    set(plugin) {
        if (!(plugin instanceof Plugin)) {
            throw 'Invalid argument';
        }

        this.#items.set(plugin.constructor.name, plugin);
    }

    /**
     * Initializes registered plugins
     */
    init() {
        this.#items.forEach(plugin => plugin.init());
    }
}
