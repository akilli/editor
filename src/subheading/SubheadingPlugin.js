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
        this.editor.tags.set({
            name: 'h3',
            group: 'heading',
            children: ['text'],
            deletable: true,
            editable: true,
            enter: 'p',
            navigable: true,
            sortable: true,
        });
        this.registerCommand('subheading', 'h3');
    }
}
