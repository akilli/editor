import Plugin from '../base/Plugin.js';

/**
 * Paragraph Plugin
 */
export default class Paragraph extends Plugin {
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
        this.editor.tags.create({
            name: 'p',
            group: 'paragraph',
            children: ['break', 'format', 'text'],
            deletable: true,
            editable: true,
            enter: 'p',
            navigable: true,
            sortable: true,
        });
        this.registerCommand('paragraph', 'p');
    }
}
