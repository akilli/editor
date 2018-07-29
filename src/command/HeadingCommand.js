import Command from './Command.js';

/**
 * Heading Command
 */
export default class HeadingCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        this.editor.execute('formatblock', '<h2>');
    }
}
