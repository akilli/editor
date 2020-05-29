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
    editor;

    /**
     * Name
     *
     * @type {String}
     */
    name;

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

        this.editor = editor;
        this.name = name;
    }

    /**
     * Filters element
     *
     * @abstract
     * @param {HTMLElement} element
     */
    filter(element) {
        throw 'Not implemented';
    }
}
