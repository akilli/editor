import Command from '../base/Command.js';

/**
 * Gallery Command
 */
export default class GalleryCommand extends Command {
    /**
     * Initializes a new gallery command
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'gallery');
    }

    /**
     * @inheritDoc
     */
    insert(attributes = {}) {
        attributes.class = 'gallery';
        this.editor.insert(this.editor.createElement('figure', {attributes: attributes}));
    }
}
