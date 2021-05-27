import Dialog from './Dialog.js';
import { Error } from './enum.js';
import { isPopulatedString } from './util.js';

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

        if (!isPopulatedString(url)) {
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
