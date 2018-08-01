/**
 * Tag
 */
export default class Tag {
    /**
     * Defines a new tag
     *
     * @param {String} name
     * @param {String} group
     * @param {String[]} attributes
     * @param {String[]} children
     * @param {Boolean} editable
     * @param {Boolean} empty
     */
    constructor({name = null, group = null, attributes = [], children = [], editable = false, empty = false} = {}) {
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
         * Is empty element
         *
         * @type {Boolean}
         * @readonly
         */
        this.empty = Boolean(empty);
    }
}
