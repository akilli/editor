import Command from '../base/Command.js';
import Element from '../base/Element.js';
import Plugin from '../base/Plugin.js';

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
        this.editor.elements.set(new Element(this.editor, this.name, 'i'));
        this.editor.commands.set(new Command(this.editor, this.name));
    }
}
