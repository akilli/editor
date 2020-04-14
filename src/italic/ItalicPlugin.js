import Command from '../editor/Command.js';
import Element from '../editor/Element.js';
import Plugin from '../editor/Plugin.js';

/**
 * Italic Plugin
 */
export default class ItalicPlugin extends Plugin {
    /**
     * Initializes a new italic plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'italic');
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.elements.set(this.name, new Element(this.editor, this.name, 'i'));
        this.editor.commands.set(this.name, new Command(this.editor, this.name));
    }
}
