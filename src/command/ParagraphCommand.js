import Command from './Command.js';

/**
 * Paragraph Command
 */
export default class ParagraphCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        this.editor.document.execCommand('formatblock', false, '<p>');
    }
}
