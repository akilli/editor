import Plugin from '../base/Plugin.js';

/**
 * Format Plugin
 */
export default class FormatPlugin extends Plugin {
    /**
     * Initializes a new format plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'format');
    }

    /**
     * @inheritDoc
     */
    init() {
        this.registerTag({name: 'strong', group: 'format'});
        this.registerTag({name: 'i', group: 'format'});
        this.registerCommand('bold', 'strong');
        this.registerConverter('b', 'strong');
        this.registerCommand('italic', 'i');
    }
}
