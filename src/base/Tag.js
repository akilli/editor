import { Error, Type } from './enum.js';

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
    children = [];

    /**
     * Allowed attributes
     *
     * @type {string[]}
     */
    attributes = [];

    /**
     * Is element alignable
     *
     * @type {boolean}
     */
    alignable = false;

    /**
     * Does element allow arbitrary amount of child elements
     *
     * @type {boolean}
     */
    arbitrary = false;

    /**
     * Is element deletable
     *
     * @type {boolean}
     */
    deletable = false;

    /**
     * Is element editable
     *
     * @type {boolean}
     */
    editable = false;

    /**
     * Is element empty or allowed to be empty
     *
     * @type {boolean}
     */
    empty = false;

    /**
     * Should element be focused on insert
     *
     * @type {boolean}
     */
    focusable = false;

    /**
     * Is element navigable
     *
     * @type {boolean}
     */
    navigable = false;

    /**
     * Does element define a slot
     *
     * @type {boolean}
     */
    slotable = false;

    /**
     * Is element sortable
     *
     * @type {boolean}
     */
    sortable = false;

    /**
     * Element to insert when ENTER-key is pressed
     *
     * @type {?string}
     */
    enter = null;

    /**
     * Defines a new tag and freezes it
     *
     * @param {string} name
     * @param {string} group
     * @param {Object.<string, any>} [opts = {}]
     */
    constructor({ name, group, ...opts } = {}) {
        const reqStr = item => item && typeof item === Type.STRING;
        const optStr = item => typeof item === Type.UNDEFINED || item && typeof item === Type.STRING;
        const optArr = item => typeof item === Type.UNDEFINED || Array.isArray(item) && !item.find(i => !reqStr(i));

        if (!reqStr(name)
            || !reqStr(group)
            || !optStr(opts.enter)
            || !optArr(opts.children)
            || !optArr(opts.attributes)
        ) {
            throw Error.INVALID_ARGUMENT;
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
        this.enter = opts.enter || null;
    }
}
