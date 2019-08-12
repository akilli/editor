/**
 * Tag
 */
export default class Tag {
    /**
     * Defines a new tag
     *
     * @param {String} name
     * @param {String} [group = name]
     * @param {String[]} [attributes = []]
     * @param {String[]} [children = []]
     * @param {Boolean} [editable = false]
     * @param {Boolean} [empty = false]
     * @param {?String} [enter = null]
     */
    constructor({name = null, group = null, attributes = [], children = [], editable = false, empty = false, enter = null} = {}) {
        if (!name || typeof name !== 'string') {
            throw 'Invalid tag';
        }

        /**
         * Tag name
         *
         * @type {String}
         * @readonly
         */
        this.name = name;

        /**
         * Name of the tag group
         *
         * @type {String}
         * @readonly
         */
        this.group = group && typeof group === 'string' ? group : name;

        /**
         * Allowed groups of child elements
         *
         * @type {String[]}
         * @readonly
         */
        this.children = Array.isArray(children) ? children : [];

        /**
         * Allowed attributes
         *
         * @type {String[]}
         * @readonly
         */
        this.attributes = Array.isArray(attributes) ? attributes : [];

        /**
         * Is element editable
         *
         * @type {Boolean}
         * @readonly
         */
        this.editable = Boolean(editable);

        /**
         * Is element empty or allowed to be empty
         *
         * @type {Boolean}
         * @readonly
         */
        this.empty = Boolean(empty);

        /**
         * Element to insert when ENTER-key is pressed
         *
         * @type {?String}
         * @readonly
         */
        this.enter = enter && typeof enter === 'string' ? enter : null;
    }
}
