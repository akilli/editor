import { Error } from './enum.js';
import { isString } from './util.js';

/**
 * Translator
 */
export default class Translator {
    /**
     * Registered translations
     *
     * @type {Map<string, Object.<string, string>>}
     */
    #items = new Map();

    /**
     * Returns registered i18n data for given name
     *
     * @param {string} name
     * @return {Object.<string, string>|undefined}
     */
    get(name) {
        return this.#items.get(name);
    }

    /**
     * Registers i18n data with given name
     *
     * @param {string} name
     * @param {Object.<string, string>} i18n
     * @return {void}
     */
    set(name, i18n) {
        if (!isString(name) || !(i18n instanceof Object)) {
            throw Error.INVALID_ARGUMENT;
        }

        this.#items.set(name, i18n);
    }

    /**
     * Translates string with registered i18n data for given name
     *
     * @param {string} name
     * @param {string} key
     * @return {string}
     */
    translate(name, key) {
        return this.get(name)?.[key] || key;
    }

    /**
     * Freezes itself and its items
     */
    freeze() {
        this.#items.forEach(i18n => Object.freeze(i18n));
        Object.freeze(this.#items);
        Object.freeze(this);
    }
}
