import Editor from './Editor.js';
import { Error, Type } from './enum.js';

/**
 * Listener
 *
 * @implements EventListener
 */
export default class Listener {
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
     * Initializes a new listener
     *
     * @borrows this.handleEvent
     * @param {Editor} editor
     */
    constructor(editor) {
        if (!(editor instanceof Editor)) {
            throw Error.INVALID_ARGUMENT;
        }

        this.#editor = editor;
    }

    /**
     * Handles events
     *
     * @param {Event} event
     * @return {void}
     */
    handleEvent(event) {
        if (typeof this[event.type] === Type.FUNCTION) {
            this[event.type](event);
        }
    }
}
