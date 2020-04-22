import Command from '../base/Command.js';
import Plugin from '../base/Plugin.js';
import Tag from '../base/Tag.js';

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
        const tagName = 'p';
        this.editor.tags.set(new Tag({name: tagName, group: 'paragraph', children: ['break', 'text'], editable: true, enter: 'p'}));
        this.editor.commands.set(new Command(this.editor, this.name, tagName));
    }
}
