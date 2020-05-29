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
    map = new Map();

    /**
     * Adds or updates a plugin
     *
     * @param {Plugin} plugin
     */
    set(plugin) {
        if (!(plugin instanceof Plugin)) {
            throw 'Invalid argument';
        }

        this.map.set(plugin.name, plugin);
    }

    /**
     * Initializes registered plugins
     */
    init() {
        this.map.forEach(plugin => plugin.init());
    }
}
