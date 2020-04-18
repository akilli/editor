import Command from '../base/Command.js';
import OrderedListElement from './OrderedListElement.js';
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
        this.editor.elements.set(new OrderedListElement(this.editor));
        this.editor.commands.set(new Command(this.editor, this.name));
    }
}
