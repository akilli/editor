import Command from './Command.js';

/**
 * Underline Command
 */
export default class UnderlineCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        this.editor.execute('underline');
    }
}
