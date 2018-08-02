import Command from './Command.js';

/**
 * Heading Command
 */
export default class HeadingCommand extends Command {
    /**
     * @inheritDoc
     */
    constructor(editor, name, tagName) {
        super(editor, name, tagName);

        if (!this.tag || this.tag.group !== 'heading') {
            throw 'Invalid heading element';
        }
    }

    /**
     * @inheritDoc
     */
    execute() {
        const h = document.createElement(this.tag.name);
        h.innerText = 'Heading';
        this.editor.insert(h);
    }
}
