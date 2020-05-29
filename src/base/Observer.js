import Editor from './Editor.js';

/**
 * Observer
 */
export default class Observer {
    /**
     * Editor
     *
     * @type {Editor}
     */
    editor;

    /**
     * Initializes a new editor observer
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        if (!(editor instanceof Editor)) {
            throw 'Invalid argument';
        }

        this.editor = editor;
    }

    /**
     * Observes editor content mutatations
     *
     * @abstract
     * @param {MutationRecord[]} ev
     */
    observe(ev) {
        throw 'Not implemented';
    }
}
