import Command from './Command.js';

/**
 * Command Manager
 *
 * @extends {Map<String, Command>}
 */
export default class CommandManager extends Map {
    /**
     * Initializes a new command manager
     *
     * @param {Command[]} [commands = []]
     */
    constructor(commands = []) {
        super();
        commands.forEach(command => this.set(command));
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
        this.get(name).execute();
    }
}
