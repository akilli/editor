import Command from './Command.js';

/**
 * Italic Command
 */
export default class ItalicCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        this.editor.execute('italic');
    }
}
