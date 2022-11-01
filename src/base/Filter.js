import Editor from './Editor.js';

/**
 * Filter
 */
export default class Filter {
    /**
     * Editor
     *
     * @type {Editor}
     */
    #editor;

    /**
     * Allows read access to editor
     *
     * @return {Editor}
     */
    get editor() {
        return this.#editor;
    }

    /**
     * Initializes a new filter
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        if (!(editor instanceof Editor)) {
            throw new TypeError('Invalid argument');
        }

        this.#editor = editor;
    }

    /**
     * Filters element
     *
     * @abstract
     * @param {HTMLElement} element
     * @return {void}
     */
    filter(element) {
        throw new Error('Not implemented');
    }
}
