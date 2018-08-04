import Command from './Command.js';

/**
 * Blockquote Command
 */
export default class BlockquoteCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        const figure = this.editor.document.createElement('figure');
        const blockquote = this.editor.document.createElement('blockquote');
        const p = this.editor.document.createElement('p');
        const figcaption = this.editor.document.createElement('figcaption');

        figure.classList.add('quote');
        figure.appendChild(blockquote);
        figure.appendChild(figcaption);
        blockquote.appendChild(p);

        this.editor.insert(figure);
    }
}
