import Command from '../base/Command.js';

/**
 * Unorderedlist Command
 */
export default class UnorderedlistCommand extends Command {
    /**
     * Initializes a new unorderedlist command
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'unorderedlist');
    }

    /**
     * @inheritDoc
     */
    insert(attributes = {}) {
        const list = this.editor.createElement('ul', {attributes: attributes});
        list.appendChild(this.editor.createElement('li'));
        this.editor.insert(list);
    }
}
