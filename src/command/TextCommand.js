import Command from './Command.js';

/**
 * Text Command
 */
export default class TextCommand extends Command {
    /**
     * @inheritDoc
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
        this.editor.formatText(this.editor.document.createElement(this.tag.name));
    }
}
