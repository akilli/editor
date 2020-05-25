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
        this.registerTag({name: 'h3', group: 'heading', children: ['text'], editable: true, enter: 'p', sortable: true})
        this.registerCommand('subheading', 'h3');
    }
}
