import Command from '../base/Command.js';

/**
 * Details Command
 */
export default class DetailsCommand extends Command {
    /**
     * @inheritDoc
     */
    insert(attributes = {}) {
        const details = this.editor.createElement(this.tagName);
        details.appendChild(this.editor.createElement('summary'));
        details.appendChild(this.editor.createElement('p'));

        this.editor.insert(details);
    }
}
