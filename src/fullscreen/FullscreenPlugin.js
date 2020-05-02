import FullscreenCommand from './FullscreenCommand.js';
import Plugin from '../base/Plugin.js';

/**
 * Fullscreen Plugin
 */
export default class FullscreenPlugin extends Plugin {
    /**
     * Initializes a new fullscreen plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'fullscreen');
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.commands.set(new FullscreenCommand(this.editor, 'fullscreen'));
    }
}
