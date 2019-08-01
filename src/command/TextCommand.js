import Command from './Command.js';

/**
 * Text Command
 */
export default class TextCommand extends Command {
    /**
     * @inheritDoc
     */
    constructor(editor, tagName) {
        super(editor, tagName);

        if (!this.tag || this.tag.group !== 'text') {
            throw 'Invalid text element';
        }
    }

    /**
     * @inheritDoc
     */
    insert() {
        this.editor.formatText(this.editor.document.createElement(this.tag.name));
    }
}
