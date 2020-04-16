import Command from '../base/Command.js';
import ListElement from '../list/ListElement.js';
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
        this.editor.elements.set(this.name, new ListElement(this.editor, this.name, 'ol'));
        this.editor.commands.set(this.name, new Command(this.editor, this.name));
    }
}
