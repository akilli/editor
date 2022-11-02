import Command from './Command.js';

export default class CommandManager {
    /**
     * @type {Map<string, Command>}
     */
    #items = new Map();

    /**
     * @param {Command[]} [commands = []]
     */
    constructor(commands = []) {
        commands.forEach((command) => this.set(command));
    }

    /**
     * @param {string} name
     * @return {Command|undefined}
     */
    get(name) {
        return this.#items.get(name);
    }

    /**
     * @param {Command} command
     * @return {void}
     */
    set(command) {
        if (!(command instanceof Command)) {
            throw new TypeError('Invalid argument');
        }

        this.#items.set(command.name, command);
    }

    /**
     * @param {string} tagName
     * @return {Command|undefined}
     */
    findByTagName(tagName) {
        return Array.from(this.#items.values()).find((command) => command.tag?.name === tagName);
    }

    /**
     * @param {string} name
     * @return {void}
     */
    execute(name) {
        this.get(name).execute();
    }

    /**
     * @return {void}
     */
    freeze() {
        this.#items.forEach((command) => Object.freeze(command));
        Object.freeze(this.#items);
        Object.freeze(this);
    }
}
