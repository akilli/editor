import Editor from '../Editor.js';

/**
 * Observer
 */
export default class Observer {
    /**
     * Initializes a new editor observer
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        if (!(editor instanceof Editor)) {
            throw 'Invalid editor';
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
     * Observes editor content mutatations
     */
    observe(ev) {
        throw 'Not implemented';
    }
}
