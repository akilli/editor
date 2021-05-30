import Command from './Command.js';

/**
 * Delete Command
 */
export default class DeleteCommand extends Command {
    /**
     * Initializes a new align command
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'delete');
    }

    /**
     * @inheritDoc
     */
    execute() {
        const element = this.editor.dom.getActiveElement();

        if (element?.hasAttribute('data-deletable')) {
            this.editor.dom.delete(element);
        }
    }
}
