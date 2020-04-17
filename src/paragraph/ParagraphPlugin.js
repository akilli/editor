import Command from '../base/Command.js';
import Element from '../base/Element.js';
import Plugin from '../base/Plugin.js';

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
        this.editor.elements.set(new Element(this.editor, this.name, 'p'));
        this.editor.commands.set(new Command(this.editor, this.name));
    }
}
