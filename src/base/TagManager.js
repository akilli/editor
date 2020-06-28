import Tag from './Tag.js';

/**
 * Tag Manager
 *
 * @extends {Map<String, Tag>}
 */
export default class TagManager extends Map {
    /**
     * Initializes a new tag manager
     *
     * @param {Tag[]} [tags = []]
     */
    constructor(tags = []) {
        super();
        tags.forEach(tag => this.set(tag));
    }

    /**
     * Indicates if a tag for given key is registered
     *
     * @param {String|HTMLElement} key
     * @return {?Boolean}
     */
    has(key) {
        return super.has(key instanceof HTMLElement ? key.localName : key);
    }

    /**
     * Returns registered tag for given key or null
     *
     * @param {String|HTMLElement} key
     * @return {?Tag}
     */
    get(key) {
        return super.get(key instanceof HTMLElement ? key.localName : key) || null;
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

        super.set(tag.name, tag);
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
