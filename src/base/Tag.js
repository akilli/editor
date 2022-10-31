import { ErrorMessage } from './enum.js';
import { isOptArray, isOptString, isString } from './util.js';

/**
 * Tag
 */
export default class Tag {
    /**
     * Name
     *
     * @type {string}
     */
    name;

    /**
     * Name of the tag group
     *
     * @type {string}
     */
    group;

    /**
     * Allowed groups of child elements
     *
     * @type {string[]}
     */
    children;

    /**
     * Allowed attributes
     *
     * @type {string[]}
     */
    attributes;

    /**
     * Is element alignable
     *
     * @type {boolean}
     */
    alignable;

    /**
     * Does element allow arbitrary amount of child elements
     *
     * @type {boolean}
     */
    arbitrary;

    /**
     * Is element deletable
     *
     * @type {boolean}
     */
    deletable;

    /**
     * Is element editable
     *
     * @type {boolean}
     */
    editable;

    /**
     * Is element empty or allowed to be empty
     *
     * @type {boolean}
     */
    empty;

    /**
     * Should element be focused on insert
     *
     * @type {boolean}
     */
    focusable;

    /**
     * Is element navigable
     *
     * @type {boolean}
     */
    navigable;

    /**
     * Does element define a slot
     *
     * @type {boolean}
     */
    slotable;

    /**
     * Is element sortable
     *
     * @type {boolean}
     */
    sortable;

    /**
     * Element to insert when ENTER-key is pressed
     *
     * @type {string|undefined}
     */
    enter;

    /**
     * Defines a new tag
     *
     * @param {string} name
     * @param {string} group
     * @param {Object.<string, any>} [opts = {}]
     */
    constructor({ name, group, ...opts } = {}) {
        if (!isString(name)
            || !isString(group)
            || !isOptArray(opts.children)
            || !isOptArray(opts.attributes)
            || !isOptString(opts.enter)
        ) {
            throw new Error(ErrorMessage.INVALID_ARGUMENT);
        }

        this.name = name;
        this.group = group;
        this.children = opts.children || [];
        this.attributes = opts.attributes || [];
        this.arbitrary = opts.arbitrary === true;
        this.alignable = opts.alignable === true;
        this.deletable = opts.deletable === true;
        this.editable = opts.editable === true;
        this.empty = opts.empty === true;
        this.focusable = opts.focusable === true;
        this.navigable = opts.navigable === true;
        this.slotable = opts.slotable === true;
        this.sortable = opts.sortable === true;
        this.enter = opts.enter;
    }
}
