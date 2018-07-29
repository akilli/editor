import Command from './Command.js';

/**
 * Subheading Command
 */
export default class SubheadingCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        const h = document.createElement('h3');
        h.innerText = 'Subheading';
        this.editor.insert(h);
    }
}
