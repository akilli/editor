import Tag from './Tag.js';
import { Error } from './enum.js';

/**
 * Tag Manager
 */
export default class TagManager {
    /**
     * Registered tags
     *
     * @type {Map<string, Tag>}
     */
    #items = new Map();

    /**
     * Initializes a new tag manager
     *
     * @param {Tag[]} [tags = []]
     */
    constructor(tags = []) {
        tags.forEach(tag => this.set(tag));
    }

    /**
     * Returns registered tag for given key
     *
     * @param {string|HTMLElement} key
     * @return {?Tag}
     */
    get(key) {
        return this.#items.get(key instanceof HTMLElement ? key.localName : key) || null;
    }

    /**
     * Adds or updates a tag
     *
     * @param {Tag} tag
     * @return {void}
     */
    set(tag) {
        if (!(tag instanceof Tag)) {
            throw Error.INVALID_ARGUMENT;
        }

        this.#items.set(tag.name, tag);
    }

    /**
     * Checks if tag or group is allowed inside parent tag
     *
     * @param {string|HTMLElement} key
     * @param {string|HTMLElement} childKey
     * @param {boolean} [isGroup = false]
     * @return {boolean}
     */
    allowed(key, childKey, isGroup = false) {
        const group = isGroup ? childKey : this.get(childKey)?.group;
        return !!this.get(key)?.children.includes(group);
    }

    /**
     * Freezes itself and its items
     */
    freeze() {
        this.#items.forEach(tag => {
            Object.freeze(tag.children);
            Object.freeze(tag.attributes);
            Object.freeze(tag);
        });
        Object.freeze(this.#items);
        Object.freeze(this);
    }
}
