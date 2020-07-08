import Command from './Command.js';

/**
 * Command Manager
 */
export default class CommandManager {
    /**
     * Registered commands
     *
     * @private
     * @type {Map<String, Command>}
     */
    __items = new Map();

    /**
     * Initializes a new command manager
     *
     * @param {Command[]} [commands = []]
     */
    constructor(commands = []) {
        commands.forEach(command => this.set(command));
    }

    /**
     * Returns registered command with given name or null
     *
     * @param {String} name
     * @return {?Command}
     */
    get(name) {
        return this.__items.get(name) || null;
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

        this.__items.set(command.name, command);
    }

    /**
     * Executes command with given name
     *
     * @param {String} name
     */
    execute(name) {
        this.get(name).execute();
    }
}
