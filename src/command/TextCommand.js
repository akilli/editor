import Command from './Command.js';

/**
 * Text Command
 */
export default class TextCommand extends Command {
    /**
     * @inheritDoc
     */
    constructor(editor, name, tagName) {
        super(editor, name, tagName);

        if (!this.tag || this.tag.group !== 'text') {
            throw 'Invalid text element';
        }
    }

    /**
     * @inheritDoc
     */
    execute() {
        this.editor.formatText(document.createElement(this.tag.name));
    }
}
