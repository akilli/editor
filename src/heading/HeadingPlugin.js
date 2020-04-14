import Command from '../editor/Command.js';
import Element from '../editor/Element.js';
import Plugin from '../editor/Plugin.js';

/**
 * Heading Plugin
 */
export default class HeadingPlugin extends Plugin {
    /**
     * Initializes a new heading plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'heading');
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.elements.set(this.name, new Element(this.editor, this.name, 'h2'));
        this.editor.commands.set(this.name, new Command(this.editor, this.name));
    }
}
