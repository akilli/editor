import Plugin from '../base/Plugin.js';

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
        this.registerTag({name: tagName, group: 'paragraph', children: ['break', 'format', 'text'], editable: true, enter: 'p'});
        this.registerCommand(this.name, tagName);
    }
}
