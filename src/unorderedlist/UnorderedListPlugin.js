import Plugin from '../base/Plugin.js';
import UnorderedListCommand from './UnorderedListCommand.js';

/**
 * Unordered List Plugin
 */
export default class UnorderedListPlugin extends Plugin {
    /**
     * Initializes a new unordered list plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'unorderedlist');
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.commands.set(new UnorderedListCommand(this.editor));
    }
}
