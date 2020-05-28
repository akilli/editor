import Plugin from '../base/Plugin.js';

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
        this.editor.tags.set({
            name: 'h2',
            group: 'heading',
            children: ['text'],
            deletable: true,
            editable: true,
            enter: 'p',
            navigable: true,
            sortable: true,
        })
        this.registerCommand('heading', 'h2');
    }
}
