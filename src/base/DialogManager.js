import Dialog from './Dialog.js';

/**
 * Dialog Manager
 */
export default class DialogManager {
    /**
     * Registered dialogs
     *
     * @private
     * @type {Map<String, Dialog>}
     */
    __items = new Map();

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
        return this.__items.get(name) || null;
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

        this.__items.set(dialog.name, dialog);
    }
}
