import Command from './command';

/**
 * Ordered List Command
 */
export default class OrderedListCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        this.editor.execute('insertorderedlist');
    }
}
