import Command from './Command.js';

/**
 * Unordered List Command
 */
export default class UnorderedListCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        this.editor.document.execCommand('insertunorderedlist');
    }
}
