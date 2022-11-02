import Tag from './Tag.js';

export default class TagManager {
    /**
     * @type {Map<string, Tag>}
     */
    #items = new Map();

    /**
     * @param {Tag[]} [tags = []]
     */
    constructor(tags = []) {
        tags.forEach((tag) => this.set(tag));
    }

    /**
     * @param {string|HTMLElement} key
     * @return {Tag|undefined}
     */
    get(key) {
        return this.#items.get(key instanceof HTMLElement ? key.localName : key);
    }

    /**
     * @param {Tag} tag
     * @return {void}
     */
    set(tag) {
        if (!(tag instanceof Tag)) {
            throw new TypeError('Invalid argument');
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
     * @return {void}
     */
    freeze() {
        this.#items.forEach((tag) => {
            Object.freeze(tag.children);
            Object.freeze(tag.attributes);
            Object.freeze(tag);
        });
        Object.freeze(this.#items);
        Object.freeze(this);
    }
}
