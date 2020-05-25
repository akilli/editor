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
        this.registerTag({name: 'p', group: 'paragraph', children: ['break', 'format', 'text'], editable: true, enter: 'p', sortable: true});
        this.registerCommand('paragraph', 'p');
    }
}
