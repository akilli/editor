import Dialog from './Dialog.js';

/**
 * Dialog Manager
 */
export default class DialogManager {
    /**
     * Registered dialogs
     *
     * @type {Map<string, Dialog>}
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
     * Returns registered dialog with given name
     *
     * @param {string} name
     * @return {Dialog|undefined}
     */
    get(name) {
        return this.#items.get(name);
    }

    /**
     * Adds or updates a dialog
     *
     * @param {Dialog} dialog
     * @return {void}
     */
    set(dialog) {
        if (!(dialog instanceof Dialog)) {
            throw new TypeError('Invalid argument');
        }

        this.#items.set(dialog.name, dialog);
    }

    /**
     * Freezes itself and its items
     */
    freeze() {
        this.#items.forEach(dialog => Object.freeze(dialog));
        Object.freeze(this.#items);
        Object.freeze(this);
    }
}
