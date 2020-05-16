import Editor from './Editor.js';

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
            throw 'Invalid argument';
        }

        /**
         * Editor
         *
         * @type {Editor}
         */
        this.editor = editor;
    }

    /**
     * Observes editor content mutatations
     *
     * @param {MutationRecord[]} ev
     */
    observe(ev) {
        throw 'Not implemented';
    }
}
