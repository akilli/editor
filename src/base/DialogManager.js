import Dialog from './Dialog.js';

/**
 * Dialog Manager
 */
export default class DialogManager {
    /**
     * Registered dialogs
     *
     * @type {Map<String, Dialog>}
     */
    #items = new Map();

    /**
     * Initializes a new dialog manager
     *
     * @param {Dialog[]} [dialogs = []]
     */
    constructor(dialogs = []) {
        dialogs.forEach(dialog => this.set(dialog));
    }

    /**
     * Returns registered dialog with given name or null
     *
     * @param {String} name
     * @return {?Dialog}
     */
    get(name) {
        return this.#items.get(name) || null;
    }

    /**
     * Adds or updates a dialog
     *
     * @param {Dialog} dialog
     */
    set(dialog) {
        if (!(dialog instanceof Dialog)) {
            throw 'Invalid argument';
        }

        this.#items.set(dialog.name, dialog);
    }
}
