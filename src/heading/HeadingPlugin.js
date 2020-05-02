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
        ['h2', 'h3'].forEach(item => this.registerTag({name: item, group: 'heading', children: ['text'], editable: true, enter: 'p'}));
        this.registerCommand(this.name, 'h2');
        this.registerCommand('subheading', 'h3');
    }
}
