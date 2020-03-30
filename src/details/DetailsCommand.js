import Command from '../editor/Command.js';

/**
 * Details Command
 */
export default class DetailsCommand extends Command {
    /**
     * @inheritDoc
     */
    insert(data = {}) {
        const details = this.editor.createElement('details');
        details.appendChild(this.editor.createElement('summary'));
        details.appendChild(this.editor.createElement('p'));
        this.editor.insert(details);
    }
}
