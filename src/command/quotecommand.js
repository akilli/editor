import Command from './command';

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
