import Command from './Command.js';

/**
 * Redo Command
 */
export default class RedoCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        this.editor.document.execCommand('redo');
    }
}
