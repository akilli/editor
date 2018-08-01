import Command from './Command.js';
import Editor from '../Editor.js';

/**
 * Command Manager
 */
export default class CommandManager {
    /**
     * Initializes with given commands
     *
     * @param {Editor} editor
     * @param {Function[]} commands
     */
    constructor(editor, commands) {
        if (!(editor instanceof Editor)) {
            throw 'Invalid editor';
        }

        /**
         * Editor
         *
         * @type {Editor}
         * @readonly
         */
        this.editor = editor;

        /**
         * Commands
         *
         * @type {Map<string, Command>}
         * @readonly
         */
        this.data = new Map();

        commands.forEach(item => {
            let command;

            if (typeof item !== 'function' || !(command = item(this.editor)) || !(command instanceof Command)) {
                throw 'Invalid command';
            }

            return this.data.set(command.name, command);
        });
    }

    /**
     * Returns all entries
     *
     * @return {IterableIterator<[string , Command]>}
     */
    all() {
        return this.data.entries();
    }

    /**
     * Returns configuration for given tag
     *
     * @param {String} name
     *
     * @return {?Command}
     */
    get(name) {
        return this.data.get(name) || null;
    }
}
