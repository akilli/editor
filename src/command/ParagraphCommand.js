import Command from './Command.js';

/**
 * Paragraph Command
 */
export default class ParagraphCommand extends Command {
    /**
     * @inheritDoc
     */
    insert() {
        this.editor.insert(this.editor.document.createElement('p'));
    }
}
