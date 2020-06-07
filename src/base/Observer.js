import Editor from './Editor.js';

/**
 * Observer
 *
 * @implements EventListener
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
     * @borrows this.handleEvent
     * @param {MutationRecord[]} records
     */
    observe(records) {
        throw 'Not implemented';
    }

    /**
     * Handles events
     *
     * @param {Event} event
     */
    handleEvent(event) {
        if (typeof this[event.type] === 'function') {
            this[event.type](event);
        }
    }
}
