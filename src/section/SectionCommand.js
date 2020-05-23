import Command from '../base/Command.js';

/**
 * Section Command
 */
export default class SectionCommand extends Command {
    /**
     * Initializes a new section command
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'section');
    }

    /**
     * @inheritDoc
     */
    insert(attributes = {}) {
        this.editor.insert(this.editor.createElement('section', {attributes: attributes}));
    }
}
