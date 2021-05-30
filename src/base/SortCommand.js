import Command from './Command.js';
import { Error, Sort } from './enum.js';

/**
 * Sort Command
 */
export default class SortCommand extends Command {
    /**
     * Configured sorting
     *
     * @type {string}
     */
    #sort;

    /**
     * Initializes a new sort command
     *
     * @param {Editor} editor
     * @param {string} sort
     */
    constructor(editor, sort) {
        const key = Object.entries(Sort).find(([, val]) => val === sort)?.[0].toLowerCase();

        if (!key) {
            throw Error.INVALID_ARGUMENT;
        }

        super(editor, 'sort-' + key);
        this.#sort = sort;
    }

    /**
     * @inheritDoc
     */
    execute() {
        const element = this.editor.dom.getActiveElement();

        if (element?.hasAttribute('data-sortable')) {
            this.editor.dom.sort(element, this.#sort);
        }
    }
}
