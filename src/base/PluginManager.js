import Plugin from './Plugin.js';

export default class PluginManager {
    /**
     * @type {Map<string, Plugin>}
     */
    #items = new Map();

    /**
     * @param {Plugin[]} [plugins = []]
     */
    constructor(plugins = []) {
        plugins.forEach((plugin) => this.set(plugin));
    }

    /**
     * @param {string} name
     * @return {Plugin|undefined}
     */
    get(name) {
        return this.#items.get(name);
    }

    /**
     * @param {Plugin} plugin
     * @return {void}
     */
    set(plugin) {
        if (!(plugin instanceof Plugin)) {
            throw new TypeError('Invalid argument');
        }

        this.#items.set(plugin.constructor.name, plugin);
    }

    /**
     * @return {void}
     */
    init() {
        this.#items.forEach((plugin) => plugin.init());
    }

    /**
     * @return {void}
     */
    freeze() {
        this.#items.forEach((plugin) => Object.freeze(plugin));
        Object.freeze(this.#items);
        Object.freeze(this);
    }
}
