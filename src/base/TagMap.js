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
     * @param {String} name
     * @return {?Tag}
     */
    get(name) {
        return super.get(name) || null;
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
     * Checks if given tag is allowed inside given parent tag
     *
     * @param {String} name
     * @param {String} parentName
     * @return {Boolean}
     */
    isAllowed(name, parentName) {
        const group = name === 'text' ? 'text' : this.get(name)?.group;

        return this.get(parentName)?.children.includes(group);
    }

    /**
     * Checks if given element is allowed inside given parent element
     *
     * @param {HTMLElement} element
     * @param {HTMLElement} parent
     * @return {Boolean}
     */
    isAllowedElement(element, parent) {
        return element instanceof HTMLElement
            && parent instanceof HTMLElement
            && this.isAllowed(element.tagName.toLowerCase(), parent.tagName.toLowerCase());
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
     * Indicates if tag is deletable
     *
     * @param {String} name
     * @return {Boolean}
     */
    isDeletable(name) {
        return !!this.get(name)?.deletable;
    }

    /**
     * Indicates if tag is editable
     *
     * @param {String} name
     * @return {Boolean}
     */
    isEditable(name) {
        return !!this.get(name)?.editable;
    }

    /**
     * Indicates if tag is empty
     *
     * @param {String} name
     * @return {Boolean}
     */
    isEmpty(name) {
        return !!this.get(name)?.empty;
    }

    /**
     * Indicates if tag is navigable
     *
     * @param {String} name
     * @return {Boolean}
     */
    isNavigable(name) {
        return !!this.get(name)?.navigable;
    }

    /**
     * Indicates if tag is sortable
     *
     * @param {String} name
     * @return {Boolean}
     */
    isSortable(name) {
        return !!this.get(name)?.sortable;
    }

    /**
     * Indicates if element is deletable
     *
     * @param {HTMLElement} element
     * @return {Boolean}
     */
    isElementDeletable(element) {
        return element instanceof HTMLElement && this.isDeletable(element.tagName.toLowerCase());
    }

    /**
     * Indicates if element is empty
     *
     * @param {HTMLElement} element
     * @return {Boolean}
     */
    isElementEmpty(element) {
        return element instanceof HTMLElement && this.isEmpty(element.tagName.toLowerCase());
    }

    /**
     * Indicates if element is editable
     *
     * @param {HTMLElement} element
     * @return {Boolean}
     */
    isElementEditable(element) {
        return element instanceof HTMLElement && this.isEditable(element.tagName.toLowerCase());
    }

    /**
     * Indicates if element is navigable
     *
     * @param {HTMLElement} element
     * @return {Boolean}
     */
    isElementNavigable(element) {
        return element instanceof HTMLElement && this.isNavigable(element.tagName.toLowerCase());
    }

    /**
     * Indicates if element is sortable
     *
     * @param {HTMLElement} element
     * @return {Boolean}
     */
    isElementSortable(element) {
        return element instanceof HTMLElement && this.isSortable(element.tagName.toLowerCase());
    }
}
