import Tag from './Tag.js';

/**
 * Tag Manager
 *
 * @extends {Map<String, Tag>}
 */
export default class TagManager extends Map {
    /**
     * Rules
     *
     * @type {Object.<String, Set<String>>}
     */
    rules = {};

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
        return super.has(this.__key(key));
    }

    /**
     * Returns registered tag for given key or null
     *
     * @param {String|HTMLElement} key
     * @return {?Tag}
     */
    get(key) {
        return super.get(this.__key(key)) || null;
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
     * Allows group inside given tag
     *
     * @param {String|HTMLElement} key
     * @param {...String} groups
     */
    allow(key, ...groups) {
        key = this.__key(key);

        if (!this.has(key) || groups.find(item => !item || typeof item !== 'string')) {
            throw 'Invalid argument';
        } else if (this.rules[key]) {
            groups.forEach(item => this.rules[key].add(item));
        } else {
            this.rules[key] = new Set(groups);
        }
    }

    /**
     * Checks if tag is allowed inside parent tag
     *
     * @param {String|HTMLElement} key
     * @param {String|HTMLElement} childKey
     * @return {Boolean}
     */
    allowed(key, childKey) {
        key = this.__key(key);

        return this.has(key) && this.rules[key]?.has(this.get(childKey)?.group);
    }

    /**
     * Returns key
     *
     * @private
     * @param {String|HTMLElement} key
     * @return {String}
     */
    __key(key) {
        if (key instanceof HTMLElement) {
            return key.getAttribute('is') || key.localName;
        }

        return key;
    }
}
