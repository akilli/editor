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
     * @param {Tag[]} [tags = []]
     */
    constructor(tags = []) {
        super();
        tags.forEach(tag => this.set(tag));
    }

    /**
     * Returns registered tag with given name or null
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
     * Creates a tag from given object
     *
     * @param {Object} opts
     */
    create(opts) {
        this.set(new Tag(opts));
    }

    /**
     * Returns names of all tags after filtering with given callback function
     *
     * @param call
     * @return {String[]}
     */
    filterKeys(call) {
        if (typeof call !== 'function') {
            throw 'Invalid argument';
        }

        return Array.from(this.values()).filter(call).map(tag => tag.name);
    }

    /**
     * Checks if tag is allowed inside parent tag
     *
     * @param {String|HTMLElement} key
     * @param {String|HTMLElement} parentKey
     * @return {Boolean}
     */
    isAllowed(key, parentKey) {
        const group = key === 'text' ? 'text' : this.get(key)?.group;

        return this.get(parentKey)?.children.includes(group);
    }

    /**
     * Indicates if tag is deletable
     *
     * @param {String|HTMLElement} key
     * @return {Boolean}
     */
    isDeletable(key) {
        return !!this.get(key)?.deletable;
    }

    /**
     * Indicates if tag is navigable
     *
     * @param {String|HTMLElement} key
     * @return {Boolean}
     */
    isNavigable(key) {
        return !!this.get(key)?.navigable;
    }

    /**
     * Indicates if tag is sortable
     *
     * @param {String|HTMLElement} key
     * @return {Boolean}
     */
    isSortable(key) {
        return !!this.get(key)?.sortable;
    }
}
