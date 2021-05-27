import Command from './Command.js';
import { Error } from './enum.js';

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
     * Returns registered command with given name
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
     * @return {void}
     */
    set(command) {
        if (!(command instanceof Command)) {
            throw Error.INVALID_ARGUMENT;
        }

        this.#items.set(command.name, command);
    }

    /**
     * Executes command with given name
     *
     * @param {string} name
     * @return {void}
     */
    execute(name) {
        this.get(name).execute();
    }

    /**
     * Freezes itself and its items
     */
    freeze() {
        this.#items.forEach(command => Object.freeze(command));
        Object.freeze(this.#items);
        Object.freeze(this);
    }
}
