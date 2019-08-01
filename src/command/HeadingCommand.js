import Command from './Command.js';

/**
 * Heading Command
 */
export default class HeadingCommand extends Command {
    /**
     * @inheritDoc
     */
    constructor(editor, tagName) {
        super(editor, tagName);

        if (!this.tag || this.tag.group !== 'heading') {
            throw 'Invalid heading element';
        }
    }

    /**
     * @inheritDoc
     */
    insert(data = {}) {
        this.editor.insert(this.editor.document.createElement(this.tag.name));
    }
}
