import Plugin from '../base/Plugin.js';

/**
 * Italic Plugin
 */
export default class ItalicPlugin extends Plugin {
    /**
     * Initializes a new italic plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'italic');
    }

    /**
     * @inheritDoc
     */
    init() {
        this.registerTag({name: 'i', group: 'format', children: ['text']});
        this.registerCommand('italic', 'i')
    }
}
