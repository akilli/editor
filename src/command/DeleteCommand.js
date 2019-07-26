import Command from './Command.js';

/**
 * Delete Command
 */
export default class DeleteCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        const widget = this.editor.getSelectedWidget();

        if (widget) {
            this.editor.content.removeChild(widget);
        }
    }
}
