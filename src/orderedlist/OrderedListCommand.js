import Command from '../base/Command.js';

/**
 * Ordered List Command
 */
export default class OrderedListCommand extends Command {
    /**
     * Initializes a new ordered list command
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'orderedlist', 'ol');
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
