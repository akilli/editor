import Command from './Command.js';

/**
 * Ordered List Command
 */
export default class OrderedListCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        this.editor.document.execCommand('insertorderedlist');
    }
}
