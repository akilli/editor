import Command from './command';

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
