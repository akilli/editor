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
        this.editor.elements.set(this.name, new Element(this.editor, this.name, 'strong'));
        this.editor.commands.set(this.name, new Command(this.editor, this.name));
        this.editor.converters.set('b', new Converter(this.editor, 'b', 'strong'))
    }
}
