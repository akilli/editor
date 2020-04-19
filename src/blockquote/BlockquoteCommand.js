import Command from '../base/Command.js';

/**
 * Ordered List Command
 */
export default class BlockquoteCommand extends Command {
    /**
     * Initializes a new blockquote command
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'blockquote', 'blockquote');
    }

    /**
     * Inserts blockquote element
     *
     * @param {String} [caption = '']
     */
    insert({caption = ''} = {}) {
        const figure = this.editor.createElement('figure', {attributes: {class: 'quote'}});
        const blockquote = this.editor.createElement('blockquote');
        const figcaption = this.editor.createElement('figcaption', {content: caption, html: true});

        blockquote.appendChild(this.editor.createElement('p'));
        figure.appendChild(blockquote);
        figure.appendChild(figcaption);

        this.editor.insert(figure);
    }
}
