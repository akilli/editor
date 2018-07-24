import Command from './Command.js';

/**
 * Unlink Command
 */
export default class UnlinkCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        this.editor.document.execCommand('unlink');
    }
}
