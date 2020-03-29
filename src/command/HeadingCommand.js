import Command from '../editor/Command.js';

/**
 * Heading Command
 */
export default class HeadingCommand extends Command {
    /**
     * Initializes a new editor heading command with given tag name
     *
     * @param {Editor} editor
     * @param {String} tagName
     */
    constructor(editor, tagName) {
        super(editor, tagName);

        if (!this.tag || this.tag.group !== 'heading') {
            throw 'No heading element';
        }
    }

    /**
     * @inheritDoc
     */
    insert(data = {}) {
        this.editor.insert(this.editor.createElement(this.tag.name));
    }
}
