import Command from './command.js';

/**
 * Unlink Command
 */
export default class UnlinkCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        this.editor.execute('unlink');
    }
}
