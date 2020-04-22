import Command from '../base/Command.js';

/**
 * Quote Command
 */
export default class QuoteCommand extends Command {
    /**
     * @inheritDoc
     */
    insert(attributes = {}) {
        const quote = this.editor.createElement(this.tagName);
        quote.appendChild(this.editor.createElement('p'));

        const figure = this.editor.createElement('figure', {attributes: {class: this.name}});
        figure.appendChild(quote);
        figure.appendChild(this.editor.createElement('figcaption'));

        this.editor.insert(figure);
    }
}
