import GalleryCommand from './GalleryCommand.js';
import Plugin from '../base/Plugin.js';

/**
 * Gallery Plugin
 */
export default class GalleryPlugin extends Plugin {
    /**
     * Initializes a new gallery plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'gallery');
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.commands.set(new GalleryCommand(this.editor));
    }
}
