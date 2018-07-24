import Command from './Command.js';

/**
 * Undo Command
 */
export default class UndoCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        this.editor.document.execCommand('undo');
    }
}
