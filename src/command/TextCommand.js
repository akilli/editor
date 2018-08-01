import Command from './Command.js';

/**
 * Text Command
 */
export default class TextCommand extends Command {
    /**
     * Initializes a new editor command and registers tag
     *
     * @param {Editor} editor
     * @param {string} tag
     */
    constructor(editor, tag) {
        super(editor);

        let config;

        if (!tag || !(config = this.editor.getTag(tag)) || config.group !== 'text') {
            throw 'Invalid element';
        }

        /**
         * Elements tag name
         *
         * @type {string}
         * @readonly
         */
        this.tag = tag;
    }

    /**
     * @inheritDoc
     */
    execute() {
        this.editor.formatText(document.createElement(this.tag));
    }
}
