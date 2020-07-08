import Plugin from './Plugin.js';

/**
 * Plugin Manager
 */
export default class PluginManager {
    /**
     * Registered plugins
     *
     * @private
     * @type {Map<String, Plugin>}
     */
    __items = new Map();

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
        return this.__items.get(name) || null;
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

        this.__items.set(plugin.constructor.name, plugin);
    }

    /**
     * Initializes registered plugins
     */
    init() {
        this.__items.forEach(plugin => plugin.init());
    }
}
