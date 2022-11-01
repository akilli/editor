import Command from '../base/Command.js';
import Sort from './Sort.js';
import Sorting from '../base/Sorting.js';

/**
 * Sort Command
 */
export default class SortCommand extends Command {
    /**
     * Configured sorting
     *
     * @type {string}
     */
    #sorting;

    /**
     * Initializes a new sort command
     *
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
     * @inheritDoc
     */
    execute() {
        const element = this.editor.dom.getActiveElement();

        if (element?.hasAttribute('data-sortable')) {
            this.editor.dom.sort(element, this.#sorting);
        }
    }
}
