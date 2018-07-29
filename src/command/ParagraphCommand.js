import Command from './Command.js';

/**
 * Paragraph Command
 */
export default class ParagraphCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        const p = document.createElement('p');
        p.innerText = 'Paragraph';
        this.editor.insert(p);
    }
}
