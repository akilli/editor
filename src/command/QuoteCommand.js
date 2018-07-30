import Command from './Command.js';

/**
 * Quote Command
 */
export default class QuoteCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        const figure = this.editor.document.createElement('figure');
        const quote = this.editor.document.createElement('blockquote');
        const p = this.editor.document.createElement('p');
        const caption = this.editor.document.createElement('figcaption');

        figure.classList.add('quote');
        figure.appendChild(quote);
        figure.appendChild(caption);
        quote.appendChild(p);
        p.innerText = 'Blockquote';
        caption.innerHTML = 'Caption';

        this.editor.insert(figure);
    }
}
