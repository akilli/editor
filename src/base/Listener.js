import Editor from './Editor.js';

/**
 * Listener
 *
 * @implements EventListener
 */
export default class Listener {
    /**
     * Editor
     *
     * @protected
     * @type {Editor}
     */
    _editor;

    /**
     * Initializes a new listener
     *
     * @borrows this.handleEvent
     * @param {Editor} editor
     */
    constructor(editor) {
        if (!(editor instanceof Editor)) {
            throw 'Invalid argument';
        }

        this._editor = editor;
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
