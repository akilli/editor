import Command from './Command.js';

/**
 * Strike Command
 */
export default class StrikeCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        this.editor.execute('strikethrough');
    }
}
