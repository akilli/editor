import Tag from './Tag.js';

/**
 * Tag Manager
 */
export default class TagManager {
    /**
     * Initializes with given tags
     *
     * @param {Object[]} tags
     */
    constructor(tags) {
        /**
         * Tags
         *
         * @type {Map<string, Tag>}
         * @readonly
         */
        this.data = new Map();

        tags.forEach(item => {
            const tag = new Tag(item);
            return this.data.set(tag.name, tag);
        });
    }

    /**
     * Returns configuration for given tag
     *
     * @param {String} name
     *
     * @return {?Tag}
     */
    get(name) {
        return this.data.get(name.toLowerCase()) || null;
    }

    /**
     * Checks if given element is allowed inside given parent element
     *
     * @param {String} name
     * @param {String} parentName
     *
     * @return {Boolean}
     */
    allowed(name, parentName) {
        const tag = this.get(name);
        const parentTag = this.get(parentName);

        return tag && parentTag && parentTag.children.includes(tag.group);
    }
}
