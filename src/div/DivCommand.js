import Command from '../base/Command.js';

/**
 * Div Command
 */
export default class DivCommand extends Command {
    /**
     * Initializes a new div command
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'div');
    }

    /**
     * @inheritDoc
     */
    insert(attributes = {}) {
        this.editor.insert(this.editor.createElement('div', {attributes: attributes}));
    }
}
