import Command from '../base/Command.js';
import Converter from '../base/Converter.js';
import Element from '../base/Element.js';
import Plugin from '../base/Plugin.js';

/**
 * Bold Plugin
 */
export default class BoldPlugin extends Plugin {
    /**
     * Initializes a new bold plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'bold');
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.elements.set(new Element(this.editor, this.name, 'strong'));
        this.editor.commands.set(new Command(this.editor, this.name));
        this.editor.converters.set(new Converter(this.editor, 'b', 'strong'))
    }
}
