/**
 * Command
 */
class Command {
    /**
     * Initializes a new editor command with given ID and name
     *
     * @param {string} id
     * @param {string} name
     */
    constructor(id, name) {
        if (typeof id !== 'string' || id.length <= 0) {
            throw 'Invalid command id';
        }

        if (typeof name !== 'string' || name.length <= 0) {
            throw 'Invalid command name';
        }

        /**
         * Command ID
         *
         * @type {string}
         * @readonly
         */
        this.id = id;

        /**
         * Command name
         *
         * @type {string}
         * @readonly
         */
        this.name = name;
    }

    /**
     * Execute command
     */
    execute() {}
}
