import Command from '../base/Command.js';

/**
 * Details Command
 */
export default class DetailsCommand extends Command {
    /**
     * Initializes a new details command
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'details');
    }

    /**
     * @inheritDoc
     */
    insert(attributes = {}) {
        const details = this.editor.createElement('details');
        details.appendChild(this.editor.createElement('slot'));
        this.editor.insert(details);
    }
}
