import Command from './Command.js';

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
