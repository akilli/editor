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
    map = new Map();

    /**
     * Adds or updates a command
     *
     * @param {Command} command
     */
    set(command) {
        if (!(command instanceof Command)) {
            throw 'Invalid argument';
        }

        this.map.set(command.name, command);
    }

    /**
     * Executes command with given name
     *
     * @param {String} name
     */
    execute(name) {
        if (!this.map.has(name)) {
            throw 'Invalid argument';
        }

        this.map.get(name).execute();
    }
}
