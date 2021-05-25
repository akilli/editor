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
     * @return {?Object.<string, string>}
     */
    get(name) {
        return this.#items.get(name) || null;
    }

    /**
     * Registers i18n data with given name
     *
     * @param {string} name
     * @param {Object.<string, string>} i18n
     * @return {void}
     */
    set(name, i18n) {
        if (!name || typeof name !== 'string' || !(i18n instanceof Object)) {
            throw 'Invalid argument';
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
}
