import Command from '../editor/Command.js';

/**
 * Paragraph Command
 */
export default class ParagraphCommand extends Command {
    /**
     * @inheritDoc
     */
    insert(data = {}) {
        this.editor.insert(this.editor.createElement('p'));
    }
}
