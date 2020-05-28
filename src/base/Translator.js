/**
 * Translator
 */
export default class Translator {
    /**
     * Translation map
     *
     * @private
     * @type {Map<String, Object.<String, String>>}
     */
    map = new Map();

    /**
     * Translates string with given translator
     *
     * @param {String} name
     * @param {String} key
     * @return {String}
     */
    get(name, key) {
        const data = this.map.get(name);

        return data && data[key] ? data[key] : key;
    }

    /**
     * Registers translation data under given name
     *
     * @param {String} name
     * @param {Object.<String, String>} data
     */
    set(name, data) {
        if (!name || typeof name !== 'string' || !(data instanceof Object)) {
            throw 'Invalid argument';
        }

        this.map.set(name, data);
    }
}
