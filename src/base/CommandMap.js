import Command from './Command.js';

/**
 * Command Map
 *
 * @extends {Map<String, Command>}
 */
export default class CommandMap extends Map {
    /**
     * Initializes a new command map
     *
     * @param {Command[]} [items = []]
     */
    constructor(items = []) {
        super();
        items.forEach(item => this.set(item));
    }

    /**
     * Returns registered command with given name or null
     *
     * @param {String} name
     * @return {?Command}
     */
    get(name) {
        return super.get(name) || null;
    }

    /**
     * Adds or updates a command
     *
     * @param {Command} command
     */
    set(command) {
        if (!(command instanceof Command)) {
            throw 'Invalid argument';
        }

        super.set(command.name, command);
    }

    /**
     * Executes command with given name
     *
     * @param {String} name
     */
    execute(name) {
        if (!this.has(name)) {
            throw 'Invalid argument';
        }

        this.get(name).execute();
    }
}
