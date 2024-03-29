import Alignment from './Alignment.js';
import Command from './Command.js';

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
        if (!Object.values(Alignment).includes(alignment)) {
            throw new TypeError('Invalid argument');
        }

        super(editor, 'align-' + alignment);
        this.#alignment = alignment;
    }

    /**
     * @return {void}
     */
    execute() {
        const element = this.editor.dom.getActiveElement();

        if (element?.hasAttribute('data-alignable')) {
            this.editor.dom.removeClass(element, ...Object.values(Alignment));
            this.#alignment !== Alignment.NONE && element.classList.add(this.#alignment);
        }
    }
}
