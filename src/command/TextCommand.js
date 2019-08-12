import EditableCommand from './EditableCommand.js';

/**
 * Text Command
 */
export default class TextCommand extends EditableCommand {
    /**
     * @inheritDoc
     */
    constructor(editor, tagName, dialog = null) {
        super(editor, tagName, dialog);

        if (!this.tag || this.tag.group !== 'text') {
            throw 'Invalid text element';
        }
    }

    /**
     * @inheritDoc
     */
    insert(data = {}) {
        this.editor.formatText(this.editor.document.createElement(this.tag.name));
    }
}
