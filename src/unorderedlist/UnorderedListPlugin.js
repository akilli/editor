import Command from '../base/Command.js';
import Plugin from '../base/Plugin.js';
import UnorderedListElement from './UnorderedListElement.js';

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
        this.editor.elements.set(new UnorderedListElement(this.editor));
        this.editor.commands.set(new Command(this.editor, this.name));
    }
}
