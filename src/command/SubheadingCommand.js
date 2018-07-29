import Command from './Command.js';

/**
 * Subheading Command
 */
export default class SubheadingCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        this.editor.execute('formatblock', '<h3>');
    }
}
