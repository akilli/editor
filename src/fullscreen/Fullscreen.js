import Base from '../base/Base.js';
import FullscreenCommand from './FullscreenCommand.js';
import Plugin from '../base/Plugin.js';

/**
 * Fullscreen Plugin
 */
export default class Fullscreen extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'fullscreen';
    }

    /**
     * @inheritDoc
     */
    static get dependencies() {
        return [Base];
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.commands.set(new FullscreenCommand(this.editor));
    }
}
