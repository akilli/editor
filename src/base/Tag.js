/**
 * Tag
 */
export default class Tag {
    /**
     * Defines a new tag
     *
     * @param {String} name
     * @param {String} group
     * @param {Object.<String, {*}>} [opts = {}]
     */
    constructor({name, group, ...opts} = {}) {
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
        this.children = Array.isArray(opts.children) ? opts.children : [];

        /**
         * Allowed attributes
         *
         * @type {String[]}
         */
        this.attributes = Array.isArray(opts.attributes) ? opts.attributes : [];

        /**
         * Is element deletable
         *
         * @type {Boolean}
         */
        this.deletable = opts.deletable === true;

        /**
         * Is element editable
         *
         * @type {Boolean}
         */
        this.editable = opts.editable === true;

        /**
         * Is element empty or allowed to be empty
         *
         * @type {Boolean}
         */
        this.empty = opts.empty === true;

        /**
         * Element to insert when ENTER-key is pressed
         *
         * @type {?String}
         */
        this.enter = opts.enter && typeof opts.enter === 'string' ? opts.enter : null;

        /**
         * Is element sortable
         *
         * @type {Boolean}
         */
        this.sortable = opts.sortable === true;
    }
}
