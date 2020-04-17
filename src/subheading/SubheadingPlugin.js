import Command from '../base/Command.js';
import Element from '../base/Element.js';
import Plugin from '../base/Plugin.js';

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
        this.editor.elements.set(new Element(this.editor, this.name, 'h3'));
        this.editor.commands.set(new Command(this.editor, this.name));
    }
}
