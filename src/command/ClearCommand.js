import Command from './Command.js';

/**
 * Clear Command
 */
export default class ClearCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        this.editor.document.execCommand('removeformat');
    }
}
