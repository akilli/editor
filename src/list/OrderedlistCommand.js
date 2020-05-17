import Command from '../base/Command.js';

/**
 * Orderedlist Command
 */
export default class OrderedlistCommand extends Command {
    /**
     * Initializes a new orderedlist command
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'orderedlist');
    }

    /**
     * @inheritDoc
     */
    insert(attributes = {}) {
        const list = this.editor.createElement('ol');
        list.appendChild(this.editor.createElement('li'));
        this.editor.insert(list);
    }
}
