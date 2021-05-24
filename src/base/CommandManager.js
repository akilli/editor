import Command from './Command.js';

/**
 * Command Manager
 */
export default class CommandManager {
    /**
     * Registered commands
     *
     * @type {Map<string, Command>}
     */
    #items = new Map();

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
     * @param {string} name
     * @return {?Command}
     */
    get(name) {
        return this.#items.get(name) || null;
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

        this.#items.set(command.name, command);
    }

    /**
     * Executes command with given name
     *
     * @param {string} name
     */
    execute(name) {
        this.get(name).execute();
    }
}
