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
        this.registerTag({name: 'h2', group: 'heading', children: ['text'], editable: true, enter: 'p'})
        this.registerCommand('heading', 'h2');
    }
}
