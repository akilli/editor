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
        const caption = this.editor.document.createElement('figcaption');
        const quote = this.editor.document.createElement('blockquote');

        figure.appendChild(quote);
        figure.appendChild(caption);
        quote.innerHTML = '<p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat</p>';
        caption.innerHTML = 'Lorem ipsum';

        this.editor.document.execCommand('inserthtml', false, figure.outerHTML);
    }
}
