import Dialog from './Dialog.js';

export default class DialogManager {
    /**
     * @type {Map<string, Dialog>}
     */
    #items = new Map();

    /**
     * @param {Dialog[]} [dialogs = []]
     */
    constructor(dialogs = []) {
        dialogs.forEach((dialog) => this.set(dialog));
    }

    /**
     * @param {string} name
     * @return {Dialog|undefined}
     */
    get(name) {
        return this.#items.get(name);
    }

    /**
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
     * @return {void}
     */
    freeze() {
        this.#items.forEach((dialog) => Object.freeze(dialog));
        Object.freeze(this.#items);
        Object.freeze(this);
    }
}
