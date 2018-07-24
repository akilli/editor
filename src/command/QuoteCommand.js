import Command from './Command.js';

/**
 * Quote Command
 */
export default class QuoteCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        this.editor.document.execCommand('formatblock', false, '<blockquote>');
    }
}
