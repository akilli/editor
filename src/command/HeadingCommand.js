import Command from './Command.js';

/**
 * Heading Command
 */
export default class HeadingCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        const h = document.createElement('h2');
        h.innerText = 'Heading';
        this.editor.insert(h);
    }
}
