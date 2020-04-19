import BlockquoteCommand from './BlockquoteCommand.js';
import Plugin from '../base/Plugin.js';

/**
 * Blockquote Plugin
 */
export default class BlockquotePlugin extends Plugin {
    /**
     * Initializes a new blockquote plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'blockquote');
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.commands.set(new BlockquoteCommand(this.editor));
    }
}
