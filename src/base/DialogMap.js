import Dialog from './Dialog.js';

/**
 * Dialog Map
 *
 * @extends {Map<String, Dialog>}
 */
export default class DialogMap extends Map {
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
