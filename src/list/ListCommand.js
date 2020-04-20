import Command from '../base/Command.js';
import Editor from '../base/Editor.js';

/**
 * List Command
 */
export default class ListCommand extends Command {
    /**
     * Initializes a new list command
     *
     * @param {Editor} editor
     * @param {String} name
     * @param {String} tagName
     */
    constructor(editor, name, tagName) {
        super(editor, name, tagName);

        if (!this.tagName) {
            throw 'Invalid argument';
        }
    }

    /**
     * @inheritDoc
     */
    insert(attributes = {}) {
        const list = this.editor.createElement(this.tagName);
        list.appendChild(this.editor.createElement('li'));

        this.editor.insert(list);
    }
}
