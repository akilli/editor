/**
 * Typed Map
 *
 * @template K
 * @template V
 * @extends {Map<K, V>}
 */
export default class TypedMap extends Map {
    /**
     * Initializes a new typed map
     *
     * @param {V} type
     */
    constructor(type) {
        super();

        /**
         * Type class constructor
         *
         * @type {V}
         */
        this.type = type;
    }

    /**
     * Adds or updates an element
     *
     * @param {V} item
     */
    set(item) {
        if (!(item instanceof this.type) || !item.hasOwnProperty('name')) {
            throw 'Invalid argument';
        }

        super.set(item.name, item);
    }
}
