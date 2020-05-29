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
    map = new Map();

    /**
     * Returns registered dialog with given name or null
     *
     * @param {String} name
     * @return {?Dialog}
     */
    get(name) {
        return this.map.get(name) || null;
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

        this.map.set(dialog.name, dialog);
    }
}
