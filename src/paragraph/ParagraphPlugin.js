import Command from '../editor/Command.js';
import Element from '../editor/Element.js';
import Plugin from '../editor/Plugin.js';

/**
 * Paragraph Plugin
 */
export default class ParagraphPlugin extends Plugin {
    /**
     * Initializes a new paragraph plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'paragraph');
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.elements.set(this.name, new Element(this.editor, this.name, 'p'));
        this.editor.commands.set(this.name, new Command(this.editor, this.name));
    }
}
