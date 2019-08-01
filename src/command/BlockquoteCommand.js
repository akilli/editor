import Command from './Command.js';

/**
 * Blockquote Command
 */
export default class BlockquoteCommand extends Command {
    /**
     * @inheritDoc
     */
    insert() {
        const figure = this.editor.document.createElement('figure');
        const blockquote = this.editor.document.createElement('blockquote');

        figure.classList.add('quote');
        figure.appendChild(blockquote);
        figure.appendChild(this.editor.document.createElement('figcaption'));
        blockquote.appendChild(this.editor.document.createElement('p'));

        this.editor.insert(figure);
    }
}
