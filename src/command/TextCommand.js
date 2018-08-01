import Command from './Command.js';

/**
 * Text Command
 */
export default class TextCommand extends Command {
    /**
     * Initializes a new editor command and registers tag
     *
     * @param {Editor} editor
     * @param {String} name
     * @param {String} tagName
     */
    constructor(editor, name, tagName) {
        super(editor, name);

        let tag;

        if (!tagName || !(tag = this.editor.tags.get(tagName)) || tag.group !== 'text') {
            throw 'Invalid text element';
        }

        /**
         * Tag
         *
         * @type {Tag}
         * @readonly
         */
        this.tag = tag;
    }

    /**
     * @inheritDoc
     */
    execute() {
        this.editor.formatText(document.createElement(this.tag.name));
    }
}
