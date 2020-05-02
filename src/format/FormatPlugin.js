import Command from '../base/Command.js';
import Converter from '../base/Converter.js';
import Plugin from '../base/Plugin.js';

/**
 * Format Plugin
 */
export default class FormatPlugin extends Plugin {
    /**
     * Initializes a new format plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'format');
    }

    /**
     * @inheritDoc
     */
    init() {
        this.registerTag({name: 'strong', group: 'format'});
        this.registerTag({name: 'i', group: 'format'});
        this.editor.commands.set(new Command(this.editor, 'bold', 'strong'));
        this.editor.converters.set(new Converter(this.editor, 'b', 'strong'))
        this.editor.commands.set(new Command(this.editor, 'italic', 'i'));
    }
}
