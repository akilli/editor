/**
 * Tag
 */
export default class Tag {
    /**
     * Defines a new tag
     *
     * @param {String} name
     * @param {String} group
     * @param {String[]} [attributes = []]
     * @param {String[]} [children = []]
     * @param {Boolean} [editable = false]
     * @param {Boolean} [empty = false]
     * @param {?String} [enter = null]
     * @param {Boolean} [sortable = false]
     */
    constructor({name, group, attributes = [], children = [], editable = false, empty = false, enter = null, sortable = false} = {}) {
        if (!name || typeof name !== 'string' || !group || typeof group !== 'string') {
            throw 'Invalid argument';
        }

        /**
         * Name
         *
         * @type {String}
         */
        this.name = name;

        /**
         * Name of the tag group
         *
         * @type {String}
         */
        this.group = group;

        /**
         * Allowed groups of child elements
         *
         * @type {String[]}
         */
        this.children = Array.isArray(children) ? children : [];

        /**
         * Allowed attributes
         *
         * @type {String[]}
         */
        this.attributes = Array.isArray(attributes) ? attributes : [];

        /**
         * Is element editable
         *
         * @type {Boolean}
         */
        this.editable = Boolean(editable);

        /**
         * Is element empty or allowed to be empty
         *
         * @type {Boolean}
         */
        this.empty = Boolean(empty);

        /**
         * Element to insert when ENTER-key is pressed
         *
         * @type {?String}
         */
        this.enter = enter && typeof enter === 'string' ? enter : null;

        /**
         * Is element sortable
         *
         * @type {Boolean}
         */
        this.sortable = Boolean(sortable);
    }
}
