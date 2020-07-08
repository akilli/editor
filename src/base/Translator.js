/**
 * Translator
 */
export default class Translator {
    /**
     * Registered translations
     *
     * @private
     * @type {Map<String, Object.<String, String>>}
     */
    __items = new Map();

    /**
     * Returns registered i18n data for given name or null
     *
     * @param {String} name
     * @return {?Object.<String, String>}
     */
    get(name) {
        return this.__items.get(name) || null;
    }

    /**
     * Registers i18n data with given name
     *
     * @param {String} name
     * @param {Object.<String, String>} i18n
     */
    set(name, i18n) {
        if (!name || typeof name !== 'string' || !(i18n instanceof Object)) {
            throw 'Invalid argument';
        }

        this.__items.set(name, i18n);
    }

    /**
     * Translates string with registered i18n data for given name
     *
     * @param {String} name
     * @param {String} key
     * @return {String}
     */
    translate(name, key) {
        return this.get(name)?.[key] || key;
    }
}
