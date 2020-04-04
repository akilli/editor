import Editor from './Editor.js';

/**
 * Filter
 */
export default class Filter {
    /**
     * Initializes a new editor filter
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        if (!(editor instanceof Editor)) {
            throw 'Invalid argument';
        }

        /**
         * Editor
         *
         * @type {Editor}
         * @readonly
         */
        this.editor = editor;
    }

    /**
     * Filters element
     *
     * @param {HTMLElement} parent
     * @param {Boolean} [forceRoot = false]
     */
    filter(parent, forceRoot = false) {
        throw 'Not implemented';
    }
}
