import { isOptArray, isOptString, isString } from './util.js';

export default class Tag {
    /**
     * @type {string}
     */
    name;

    /**
     * @type {string}
     */
    group;

    /**
     * @type {string[]}
     */
    children;

    /**
     * @type {string[]}
     */
    attributes;

    /**
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
     * @type {boolean}
     */
    deletable;

    /**
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
     * @type {boolean}
     */
    focusable;

    /**
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
     * @param {string} name
     * @param {string} group
     * @param {Object.<string, any>} [opts = {}]
     */
    constructor({ name, group, ...opts } = {}) {
        if (
            !isString(name) ||
            !isString(group) ||
            !isOptArray(opts.children) ||
            !isOptArray(opts.attributes) ||
            !isOptString(opts.enter)
        ) {
            throw new TypeError('Invalid argument');
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
