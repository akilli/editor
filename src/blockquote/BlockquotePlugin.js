import BlockquoteElement from './BlockquoteElement.js';
import Command from '../base/Command.js';
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
        this.editor.elements.set(this.name, new BlockquoteElement(this.editor));
        this.editor.commands.set(this.name, new Command(this.editor, this.name));
    }
}
