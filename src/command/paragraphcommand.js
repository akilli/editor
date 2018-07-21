import Command from './command.js';

/**
 * Paragraph Command
 */
export default class ParagraphCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        this.editor.execute('insertparagraph');
    }
}
