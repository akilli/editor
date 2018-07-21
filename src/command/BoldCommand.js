import Command from './Command.js';

/**
 * Bold Command
 */
export default class BoldCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        this.editor.execute('bold');
    }
}
