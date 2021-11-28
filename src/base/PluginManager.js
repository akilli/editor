import Plugin from './Plugin.js';
import { ErrorMessage } from './enum.js';

/**
 * Plugin Manager
 */
export default class PluginManager {
    /**
     * Registered plugins
     *
     * @type {Map<string, Plugin>}
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
     * Returns registered plugin with given name
     *
     * @param {string} name
     * @return {Plugin|undefined}
     */
    get(name) {
        return this.#items.get(name);
    }

    /**
     * Adds or updates a plugin
     *
     * @param {Plugin} plugin
     * @return {void}
     */
    set(plugin) {
        if (!(plugin instanceof Plugin)) {
            throw ErrorMessage.INVALID_ARGUMENT;
        }

        this.#items.set(plugin.constructor.name, plugin);
    }

    /**
     * Initializes registered plugins
     *
     * @return {void}
     */
    init() {
        this.#items.forEach(plugin => plugin.init());
    }

    /**
     * Freezes itself and its items
     */
    freeze() {
        this.#items.forEach(plugin => Object.freeze(plugin));
        Object.freeze(this.#items);
        Object.freeze(this);
    }
}
