import Command from './Command.js';

/**
 * Paragraph Command
 */
export default class ParagraphCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        const p = this.editor.document.createElement('p');
        p.innerText = 'Paragraph';
        this.editor.insert(p);
    }
}
