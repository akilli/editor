import Editor from './Editor.js';

export default class Filter {
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
     * @param {Editor} editor
     */
    constructor(editor) {
        if (!(editor instanceof Editor)) {
            throw new TypeError('Invalid argument');
        }

        this.#editor = editor;
    }

    /**
     * @abstract
     * @param {HTMLElement} element
     * @return {void}
     */
    filter(element) {
        throw new Error('Not implemented');
    }
}
