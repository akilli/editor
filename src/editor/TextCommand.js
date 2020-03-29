import Command from './Command.js';

/**
 * Text Command
 */
export default class TextCommand extends Command {
    /**
     * Initializes a new editor text command with given tag name
     *
     * @param {Editor} editor
     * @param {String} tagName
     * @param {?Function} [dialog = null]
     */
    constructor(editor, tagName, dialog = null) {
        super(editor, tagName, dialog);

        if (!this.tag || this.tag.group !== 'text') {
            throw 'No text element';
        }
    }

    /**
     * @inheritDoc
     */
    insert(data = {}) {
        this.editor.formatText(this.editor.createElement(this.tag.name));
    }
}
