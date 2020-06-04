/**
 * Tag
 */
export default class Tag {
    /**
     * Name
     *
     * @type {String}
     */
    name;

    /**
     * Name of the tag group
     *
     * @type {String}
     */
    group;

    /**
     * Is element alignable
     *
     * @type {Boolean}
     */
    alignable = false;

    /**
     * Allowed attributes
     *
     * @type {String[]}
     */
    attributes = [];

    /**
     * Allowed groups of child elements
     *
     * @type {String[]}
     */
    children = [];

    /**
     * Is element deletable
     *
     * @type {Boolean}
     */
    deletable = false;

    /**
     * Is element editable
     *
     * @type {Boolean}
     */
    editable = false;

    /**
     * Is element empty or allowed to be empty
     *
     * @type {Boolean}
     */
    empty = false;

    /**
     * Element to insert when ENTER-key is pressed
     *
     * @type {?String}
     */
    enter = null;

    /**
     * Is element navigable
     *
     * @type {Boolean}
     */
    navigable = false;

    /**
     * Is element sortable
     *
     * @type {Boolean}
     */
    sortable = false;

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

        this.name = name;
        this.group = group;
        this.alignable = opts.alignable === true;
        this.attributes = Array.isArray(opts.attributes) ? opts.attributes : [];
        this.children = Array.isArray(opts.children) ? opts.children : [];
        this.deletable = opts.deletable === true;
        this.editable = opts.editable === true;
        this.empty = opts.empty === true;
        this.enter = opts.enter && typeof opts.enter === 'string' ? opts.enter : null;
        this.navigable = opts.navigable === true;
        this.sortable = opts.sortable === true;
    }
}
