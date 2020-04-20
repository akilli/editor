import Command from '../base/Command.js';
import Plugin from '../base/Plugin.js';
import Tag from '../base/Tag.js';

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
        this.editor.tags.set(new Tag({name: 'h2', group: 'heading', editable: true, enter: 'p'}));
        this.editor.tags.set(new Tag({name: 'h3', group: 'heading', editable: true, enter: 'p'}));
        this.editor.commands.set(new Command(this.editor, this.name, 'h2'));
        this.editor.commands.set(new Command(this.editor, 'subheading', 'h3'));
    }
}
