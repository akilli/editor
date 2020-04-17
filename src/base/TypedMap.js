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
     * @param {Array.<V>} items
     */
    constructor(type, items = []) {
        super();

        /**
         * Type class constructor
         *
         * @type {V}
         * @readonly
         */
        this.type = type;

        // Initialize items
        items.forEach(item => this.set(item));
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
