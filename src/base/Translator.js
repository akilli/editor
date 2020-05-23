/**
 * Translator
 */
export default class Translator {
    /**
     * Initializes a new translator with given name and translation data
     *
     * @param {String} name
     * @param {Object.<String, String>} data
     */
    constructor(name, data) {
        if (!name || typeof name !== 'string') {
            throw 'Invalid argument';
        }

        /**
         * Name
         *
         * @type {String}
         */
        this.name = name;

        /**
         * Translation data
         *
         * @type {Object.<String, String>}
         */
        this.data = data;
    }

    /**
     * Translates given string
     *
     * @param {String} key
     * @return {String}
     */
    translate(key) {
        return this.data[key] || key;
    }
}
