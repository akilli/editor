import Command from '../base/Command.js';
import Sort from './Sort.js';
import Sorting from '../base/Sorting.js';

export default class SortCommand extends Command {
    /**
     * @type {string}
     */
    #sorting;

    /**
     * @param {Editor} editor
     * @param {string} sorting
     */
    constructor(editor, sorting) {
        if (!Sorting.values().includes(sorting)) {
            throw new TypeError('Invalid argument');
        }

        super(editor, Sort.name + '-' + sorting);
        this.#sorting = sorting;
    }

    /**
     * @return {void}
     */
    execute() {
        const element = this.editor.dom.getActiveElement();

        if (element?.hasAttribute('data-sortable')) {
            this.editor.dom.sort(element, this.#sorting);
        }
    }
}
