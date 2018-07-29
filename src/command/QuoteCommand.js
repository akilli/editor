import Command from './Command.js';

/**
 * Quote Command
 */
export default class QuoteCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        const html = '<figure class="quote"><blockquote><p>Quote</p></blockquote><figcaption>Caption</figcaption></figure>';
        this.editor.execute('inserthtml', html);
    }
}
