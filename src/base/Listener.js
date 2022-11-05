import Editor from './Editor.js';
import { isFunction } from './util.js';

/**
 * @abstract
 * @implements EventListener
 */
export default class Listener {
    /**
     * @type {Editor}
     */
    #editor;

    /**
     * @return {Editor}
     */
    get editor() {
        return this.#editor;
    }

    /**
     * @borrows handleEvent
     * @param {Editor} editor
     */
    constructor(editor) {
        if (!(editor instanceof Editor)) {
            throw new TypeError('Invalid argument');
        }

        this.#editor = editor;
    }

    /**
     * @param {Event} event
     * @return {void}
     */
    handleEvent(event) {
        isFunction(this[event.type]) && this[event.type](event);
    }

    /**
     * Translates given string
     *
     * @protected
     * @param {string} key
     * @return {string}
     */
    _(key) {
        return this.editor.translate(key);
    }
}
