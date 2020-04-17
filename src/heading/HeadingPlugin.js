import Command from '../base/Command.js';
import Element from '../base/Element.js';
import Plugin from '../base/Plugin.js';

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
        this.editor.elements.set(new Element(this.editor, this.name, 'h2'));
        this.editor.commands.set(new Command(this.editor, this.name));
    }
}
