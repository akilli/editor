import Command from './command';

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
