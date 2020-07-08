import Editor from './Editor.js';

/**
 * Filter
 */
export default class Filter {
    /**
     * Editor
     *
     * @protected
     * @type {Editor}
     */
    _editor;

    /**
     * Initializes a new filter
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        if (!(editor instanceof Editor)) {
            throw 'Invalid argument';
        }

        this._editor = editor;
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
