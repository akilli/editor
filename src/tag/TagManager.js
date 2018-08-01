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
        this.tags = new Map();

        tags.forEach(item => {
            const tag = new Tag(item);
            return this.tags.set(tag.name, tag);
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
        return this.tags.get(name.toLowerCase()) || null;
    }
}
