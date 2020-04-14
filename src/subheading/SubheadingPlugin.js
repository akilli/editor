import Command from '../editor/Command.js';
import Element from '../editor/Element.js';
import Plugin from '../editor/Plugin.js';

/**
 * Subheading Plugin
 */
export default class SubheadingPlugin extends Plugin {
    /**
     * Initializes a new subheading plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'subheading');
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.elements.set(this.name, new Element(this.editor, this.name, 'h3'));
        this.editor.commands.set(this.name, new Command(this.editor, this.name));
    }
}
