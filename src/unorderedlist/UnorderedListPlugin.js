import Command from '../editor/Command.js';
import ListElement from '../list/ListElement.js';
import Plugin from '../editor/Plugin.js';

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
        this.editor.elements.set(this.name, new ListElement(this.editor, this.name, 'ul'));
        this.editor.commands.set(this.name, new Command(this.editor, this.name));
    }
}
