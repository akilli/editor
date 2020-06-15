import Dialog from './Dialog.js';

/**
 * Dialog Manager
 *
 * @extends {Map<String, Dialog>}
 */
export default class DialogManager extends Map {
    /**
     * Initializes a new dialog manager
     *
     * @param {Dialog[]} [dialogs = []]
     */
    constructor(dialogs = []) {
        super();
        dialogs.forEach(dialog => this.set(dialog));
    }

    /**
     * Returns registered dialog with given name or null
     *
     * @param {String} name
     * @return {?Dialog}
     */
    get(name) {
        return super.get(name) || null;
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

        super.set(dialog.name, dialog);
    }
}
