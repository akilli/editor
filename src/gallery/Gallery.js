import GalleryCommand from './GalleryCommand.js';
import GalleryObserver from './GalleryObserver.js';
import Plugin from '../base/Plugin.js';

/**
 * Gallery Plugin
 */
export default class Gallery extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'gallery';
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.observe(new GalleryObserver(this.editor));
        this.editor.commands.set(new GalleryCommand(this.editor));
    }
}
