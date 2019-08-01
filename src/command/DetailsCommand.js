import Command from './Command.js';

/**
 * Details Command
 */
export default class DetailsCommand extends Command {
    /**
     * @inheritDoc
     */
    insert(data = {}) {
        const details = this.editor.document.createElement('details');
        details.appendChild(this.editor.document.createElement('summary'));
        details.appendChild(this.editor.document.createElement('p'));
        this.editor.insert(details);
    }
}
