import Tag from './Tag.js';

/**
 * Tag Manager
 */
export default class TagManager {
    /**
     * Initializes a new tag manager
     *
     * @param {Tag[]} tags
     */
    constructor(tags = []) {
        /**
         * Registered tags
         *
         * @type {Map<String, Tag>}
         */
        this.tags = new Map();

        // Initialize tags
        tags.forEach(tag => this.set(tag));
    }

    /**
     * Indicates if tag with given name is registered
     *
     * @param {String} name
     * @return {Boolean}
     */
    has(name) {
        return this.tags.has(name);
    }

    /**
     * Returns registered tag with given name or null
     *
     * @param {String} name
     * @return {?Tag}
     */
    get(name) {
        return this.tags.get(name) || null;
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

        this.tags.set(tag.name, tag);
    }

    /**
     * Creates a tag from given object
     *
     * @param {Object} opts
     */
    create(opts) {
        if (!(opts instanceof Object)) {
            throw 'Invalid argument';
        }

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
        const tag = this.get(name);
        const parentTag = this.get(parentName);

        return tag && parentTag && parentTag.children.includes(tag.group);
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
     * Returns names of all deletable tags
     *
     * @return {String[]}
     */
    deletable() {
        return Array.from(this.tags.values()).filter(tag => tag.deletable).map(tag => tag.name);
    }

    /**
     * Returns names of all editable tags
     *
     * @return {String[]}
     */
    editable() {
        return Array.from(this.tags.values()).filter(tag => tag.editable).map(tag => tag.name);
    }

    /**
     * Returns names of all empty tags
     *
     * @return {String[]}
     */
    empty() {
        return Array.from(this.tags.values()).filter(tag => tag.empty).map(tag => tag.name);
    }

    /**
     * Returns names of all navigable tags
     *
     * @return {String[]}
     */
    navigable() {
        return Array.from(this.tags.values()).filter(tag => tag.navigable).map(tag => tag.name);
    }

    /**
     * Returns names of all sortable tags
     *
     * @return {String[]}
     */
    sortable() {
        return Array.from(this.tags.values()).filter(tag => tag.sortable).map(tag => tag.name);
    }

    /**
     * Indicates if tag is deletable
     *
     * @param {String} name
     * @return {Boolean}
     */
    isDeletable(name) {
        return this.has(name) && this.get(name).deletable;
    }

    /**
     * Indicates if tag is editable
     *
     * @param {String} name
     * @return {Boolean}
     */
    isEditable(name) {
        return this.has(name) && this.get(name).editable;
    }

    /**
     * Indicates if tag is empty
     *
     * @param {String} name
     * @return {Boolean}
     */
    isEmpty(name) {
        return this.has(name) && this.get(name).empty;
    }

    /**
     * Indicates if tag is navigable
     *
     * @param {String} name
     * @return {Boolean}
     */
    isNavigable(name) {
        return this.has(name) && this.get(name).navigable;
    }

    /**
     * Indicates if tag is sortable
     *
     * @param {String} name
     * @return {Boolean}
     */
    isSortable(name) {
        return this.has(name) && this.get(name).sortable;
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
