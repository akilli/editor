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
        super(editor, 'quote', 'blockquote');
    }

    /**
     * Inserts quote element
     *
     * @param {String} [caption = '']
     */
    insert({caption = ''} = {}) {
        const figure = this.editor.createElement('figure', {attributes: {class: 'quote'}});
        const quote = this.editor.createElement('blockquote');
        const figcaption = this.editor.createElement('figcaption', {content: caption, html: true});

        quote.appendChild(this.editor.createElement('p'));
        figure.appendChild(quote);
        figure.appendChild(figcaption);

        this.editor.insert(figure);
    }
}
