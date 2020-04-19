import Command from '../base/Command.js';

/**
 * Unordered List Command
 */
export default class UnorderedListCommand extends Command {
    /**
     * Initializes a new unordered list command
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'unorderedlist', 'ul');
    }

    /**
     * @inheritDoc
     */
    insert(attributes = {}) {
        const list = this.editor.createElement('ul');
        list.appendChild(this.editor.createElement('li'));

        this.editor.insert(list);
    }
}
