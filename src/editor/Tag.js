import EditorObject from './EditorObject.js'

/**
 * Tag
 */
export default class Tag extends EditorObject {
    /**
     * Defines a new tag
     *
     * @param {Editor} editor
     * @param {String} name
     * @param {String} group
     * @param {String[]} [attributes = []]
     * @param {String[]} [children = []]
     * @param {Boolean} [editable = false]
     * @param {Boolean} [empty = false]
     * @param {?String} [enter = null]
     */
    constructor(editor, name, group, {attributes = [], children = [], editable = false, empty = false, enter = null} = {}) {
        super(editor, name);

        if (!group || typeof group !== 'string') {
            throw 'Invalid argument';
        }

        /**
         * Name of the tag group
         *
         * @type {String}
         * @readonly
         */
        this.group = group;

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
