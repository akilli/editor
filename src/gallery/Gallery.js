import Base from '../base/Base.js';
import Figure from '../figure/Figure.js';
import GalleryCommand from './GalleryCommand.js';
import GalleryObserver from './GalleryObserver.js';
import Plugin from '../base/Plugin.js';
import Slot from '../slot/Slot.js';

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
    static get dependencies() {
        return [Base, Figure, Slot];
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.observe(new GalleryObserver(this.editor));
        this.editor.commands.set(new GalleryCommand(this.editor));
    }
}
