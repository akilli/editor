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
        const figure = this.editor.createElement('figure', {attributes: {class: 'gallery'}});
        figure.appendChild(this.editor.createElement('slot'));
        figure.appendChild(this.editor.createElement('figcaption'));
        this.editor.insert(figure);
    }
}
