import Command from './command.js';

/**
 * Quote Command
 */
export default class QuoteCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        this.editor.execute('formatblock', '<blockquote>');
    }
}
