import Tag from './Tag.js';

/**
 * Tag Map
 *
 * @extends {Map<String, Tag>}
 */
export default class TagMap extends Map {
    /**
     * Initializes a new tag map
     *
     * @param {Tag[]|Object[]} [tags = []]
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
     * @param {Tag|Object} tag
     */
    set(tag) {
        if (!(tag instanceof Tag)) {
            tag = new Tag(tag);
        }

        super.set(tag.name, tag);
    }

    /**
     * Allows group inside given tag
     *
     * @param {String|HTMLElement} key
     * @param {String} group
     */
    allow(key, group) {
        if (!group || typeof group !== 'string') {
            throw 'Invalid argument';
        }

        const tag = this.get(key);

        if (tag && !tag.children.includes(group)) {
            tag.children.push(group);
        }
    }

    /**
     * Checks if tag is allowed inside parent tag
     *
     * @param {String|HTMLElement} key
     * @param {String|HTMLElement} parentKey
     * @return {Boolean}
     */
    allowed(key, parentKey) {
        return !!this.get(parentKey)?.children.includes(this.get(key)?.group);
    }
}
