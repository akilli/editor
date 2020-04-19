import OrderedListCommand from './OrderedListCommand.js';
import Plugin from '../base/Plugin.js';

/**
 * Ordered List Plugin
 */
export default class OrderedListPlugin extends Plugin {
    /**
     * Initializes a new ordered list plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'orderedlist');
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.commands.set(new OrderedListCommand(this.editor));
    }
}
