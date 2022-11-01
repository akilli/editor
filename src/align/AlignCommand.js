import Align from './Align.js';
import Alignment from '../base/Alignment.js';
import Command from '../base/Command.js';

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
        if (!Alignment.values().includes(alignment)) {
            throw new TypeError('Invalid argument');
        }

        super(editor, Align.name + '-' + alignment);
        this.#alignment = alignment;
    }

    /**
     * @inheritDoc
     */
    execute() {
        const element = this.editor.dom.getActiveElement();

        if (element?.hasAttribute('data-alignable')) {
            element.classList.remove(...Alignment.values());
            this.#alignment !== Alignment.NONE && element.classList.add(this.#alignment);
        }
    }
}
