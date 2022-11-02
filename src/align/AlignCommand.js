import Align from './Align.js';
import Alignment from '../base/Alignment.js';
import Command from '../base/Command.js';

export default class AlignCommand extends Command {
    /**
     * @type {string}
     */
    #alignment;

    /**
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
     * @return {void}
     */
    execute() {
        const element = this.editor.dom.getActiveElement();

        if (element?.hasAttribute('data-alignable')) {
            element.classList.remove(...Alignment.values());
            this.#alignment !== Alignment.NONE && element.classList.add(this.#alignment);
        }
    }
}
