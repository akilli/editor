import Command from '../base/Command.js';
import Converter from '../base/Converter.js';
import Plugin from '../base/Plugin.js';

/**
 * Text Plugin
 */
export default class TextPlugin extends Plugin {
    /**
     * Initializes a new text plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'text');
    }

    /**
     * @inheritDoc
     */
    init() {
        this.registerTag({name: 'strong', group: 'text'});
        this.registerTag({name: 'i', group: 'text'});
        this.editor.commands.set(new Command(this.editor, 'bold', 'strong'));
        this.editor.converters.set(new Converter(this.editor, 'b', 'strong'))
        this.editor.commands.set(new Command(this.editor, 'italic', 'i'));
    }
}
