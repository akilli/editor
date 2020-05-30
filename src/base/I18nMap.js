/**
 * I18n Map
 *
 * @extends {Map<String, Object.<String, String>>}
 */
export default class I18nMap extends Map {
    /**
     * Returns registered i18n data for given name or null
     *
     * @param {String} name
     * @return {?Object.<String, String>}
     */
    get(name) {
        return super.get(name) || null;
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

        super.set(name, i18n);
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
