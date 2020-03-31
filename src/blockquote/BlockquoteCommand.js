import Command from '../editor/Command.js';

/**
 * Blockquote Command
 */
export default class BlockquoteCommand extends Command {
    /**
     * @inheritDoc
     */
    insert(data = {}) {
        const figure = this.editor.createElement('figure', {class: 'quote'});
        const blockquote = this.editor.createElement('blockquote');

        figure.appendChild(blockquote);
        figure.appendChild(this.editor.createElement('figcaption'));
        blockquote.appendChild(this.editor.createElement('p'));

        this.editor.insert(figure);
    }
}
