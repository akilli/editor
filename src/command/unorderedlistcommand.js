import Command from './command.js';

/**
 * Unordered List Command
 */
export default class UnorderedListCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        this.editor.execute('insertunorderedlist');
    }
}
