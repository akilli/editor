import Align from './Align.js';
import Command from '../base/Command.js';
import { Alignment } from '../base/enum.js';

/**
 * Align Command
 */
export default class AlignCommand extends Command {
    /**
     * Configured alignment
     *
     * @type {string}
     */
    #alignment;

    /**
     * Initializes a new align command
     *
     * @param {Editor} editor
     * @param {string} alignment
     */
    constructor(editor, alignment) {
        const key = Object.entries(Alignment).find(([, val]) => val === alignment)?.[0].toLowerCase();

        if (!key) {
            throw new TypeError('Invalid argument');
        }

        super(editor, Align.name + '-' + key);
        this.#alignment = alignment;
    }

    /**
     * @inheritDoc
     */
    execute() {
        const element = this.editor.dom.getActiveElement();

        if (element?.hasAttribute('data-alignable')) {
            element.classList.remove(...Object.values(Alignment));
            this.#alignment !== Alignment.NONE && element.classList.add(this.#alignment);
        }
    }
}
