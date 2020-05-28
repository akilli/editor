import Plugin from '../base/Plugin.js';

/**
 * Bold Plugin
 */
export default class BoldPlugin extends Plugin {
    /**
     * Initializes a new bold plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'bold');
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.tags.set({
            name: 'b',
            group: 'format',
            children: ['text'],
        });
        this.registerCommand('bold', 'b')
    }
}
