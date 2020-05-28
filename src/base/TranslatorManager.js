import Translator from './Translator.js';

/**
 * Translator Manager
 */
export default class TranslatorManager {
    /**
     * Initializes a new translator manager
     *
     * @param {Translator[]} translators
     */
    constructor(translators = []) {
        /**
         * Registered translators
         *
         * @type {Map<String, Translator>}
         */
        this.translators = new Map();

        // Initialize translators
        translators.forEach(translator => this.set(translator));
    }

    /**
     * Adds or updates a translator
     *
     * @param {Translator} translator
     */
    set(translator) {
        if (!(translator instanceof Translator)) {
            throw 'Invalid argument';
        }

        this.translators.set(translator.name, translator);
    }

    /**
     * Creates a translator from given name and data
     *
     * @param {String} name
     * @param {Object} data
     */
    create(name, data) {
        if (!name || typeof name !== 'string' || !(data instanceof Object)) {
            throw 'Invalid argument';
        }

        this.set(new Translator(name, data));
    }

    /**
     * Translates string with given translator
     *
     * @param {String} name
     * @param {String} key
     * @return {String}
     */
    translate(name, key) {
        return this.translators.has(name) ? this.translators.get(name).translate(key) : key;
    }
}
