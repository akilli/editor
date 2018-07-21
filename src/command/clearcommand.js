import Command from './command.js';

/**
 * Clear Command
 */
export default class ClearCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        this.editor.execute('removeformat');
    }
}
