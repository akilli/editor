import Editor from './Editor.js';

/**
 * Filter
 */
export default class Filter {
    /**
     * Initializes a new filter with given name
     *
     * @param {Editor} editor
     * @param {String} name
     */
    constructor(editor, name) {
        if (!(editor instanceof Editor) || !name || typeof name !== 'string') {
            throw 'Invalid argument';
        }

        /**
         * Editor
         *
         * @type {Editor}
         */
        this.editor = editor;

        /**
         * Name
         *
         * @type {String}
         */
        this.name = name;
    }

    /**
     * Filters element
     *
     * @param {HTMLElement} element
     */
    filter(element) {
        throw 'Not implemented';
    }
}
