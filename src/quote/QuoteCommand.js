import Command from '../base/Command.js';

/**
 * Quote Command
 */
export default class QuoteCommand extends Command {
    /**
     * Initializes a new quote command
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'quote');
    }

    /**
     * @inheritDoc
     */
    insert(attributes = {}) {
        attributes.class = 'quote';
        const figure = this.editor.createElement('figure', {attributes: attributes});
        figure.appendChild(this.editor.createElement('blockquote'));
        figure.appendChild(this.editor.createElement('figcaption'));

        this.editor.insert(figure);
    }
}
