import Tag from './Tag.js';

/**
 * Tag Manager
 */
export default class TagManager {
    /**
     * Registered tags
     *
     * @type {Map<String, Tag>}
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
     * Returns registered tag for given key or null
     *
     * @param {String|HTMLElement} key
     * @return {?Tag}
     */
    get(key) {
        return this.#items.get(key instanceof HTMLElement ? key.localName : key) || null;
    }

    /**
     * Adds or updates a tag
     *
     * @param {Tag} tag
     */
    set(tag) {
        if (!(tag instanceof Tag)) {
            throw 'Invalid argument';
        }

        this.#items.set(tag.name, tag);
    }

    /**
     * Checks if tag or group is allowed inside parent tag
     *
     * @param {String|HTMLElement} key
     * @param {String|HTMLElement} childKey
     * @param {Boolean} [isGroup = false]
     * @return {Boolean}
     */
    allowed(key, childKey, isGroup = false) {
        const group = isGroup ? childKey : this.get(childKey)?.group;
        return !!this.get(key)?.children.includes(group);
    }
}
