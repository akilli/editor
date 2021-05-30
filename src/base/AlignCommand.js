import Command from './Command.js';
import { Align, Error } from './enum.js';

/**
 * Align Command
 */
export default class AlignCommand extends Command {
    /**
     * Configured alignment
     *
     * @type {string}
     */
    #align;

    /**
     * Initializes a new align command
     *
     * @param {Editor} editor
     * @param {string} align
     */
    constructor(editor, align) {
        const key = Object.entries(Align).find(([, val]) => val === align)?.[0].toLowerCase();

        if (!key) {
            throw Error.INVALID_ARGUMENT;
        }

        super(editor, 'align-' + key);
        this.#align = align;
    }

    /**
     * @inheritDoc
     */
    execute() {
        const element = this.editor.dom.getActiveElement();

        if (element?.hasAttribute('data-alignable')) {
            element.classList.remove(...Object.values(Align));
            this.#align !== Align.NONE && element.classList.add(this.#align);
        }
    }
}
