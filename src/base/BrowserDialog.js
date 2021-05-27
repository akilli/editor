import Dialog from './Dialog.js';
import { Error, Type } from './enum.js';

/**
 * Browser Dialog
 */
export default class BrowserDialog extends Dialog {
    /**
     * Browser URL
     *
     * @type {string}
     */
    #url;

    /**
     * Initializes a new editor browser dialog
     *
     * @param {Editor} editor
     * @param {string} name
     * @param {string} url
     */
    constructor(editor, name, url) {
        super(editor, name);

        if (!url || typeof url !== Type.STRING) {
            throw Error.INVALID_ARGUMENT;
        }

        this.#url = url;
    }

    /**
     * Opens a browser window and registers a listener for communication between editor and browser windows
     *
     * @inheritDoc
     */
    open(save, attributes = {}) {
        this.editor.dom.open({ url: this.#url, name: this.name, call: save, params: attributes });
    }
}
