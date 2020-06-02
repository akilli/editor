import Plugin from './Plugin.js';

/**
 * Plugin Map
 *
 * @extends {Map<String, Plugin>}
 */
export default class PluginMap extends Map {
    /**
     * Initializes a new plugin map
     *
     * @param {Plugin[]} [plugins = []]
     */
    constructor(plugins = []) {
        super();
        plugins.forEach(plugin => this.set(plugin));
    }

    /**
     * Returns registered plugin with given name or null
     *
     * @param {String} name
     * @return {?Plugin}
     */
    get(name) {
        return super.get(name) || null;
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

        super.set(plugin.constructor.name, plugin);
    }

    /**
     * Initializes registered plugins
     */
    init() {
        this.forEach(plugin => plugin.init());
    }
}
