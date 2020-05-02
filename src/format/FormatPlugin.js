import FormatCommand from './FormatCommand.js';
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
        for (let [key, val] of Object.entries(this.editor.config.format.elements)) {
            this.registerTag({name: val, group: 'format'});
            this.editor.commands.set(new FormatCommand(this.editor, key, val));
        }
    }

    /**
     * @inheritDoc
     */
    static defaultConfig() {
        return {elements: {}};
    }
}
