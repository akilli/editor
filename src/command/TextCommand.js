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
     */
    constructor(editor, name) {
        super(editor);

        let tag;

        if (!name || !(tag = this.editor.tags.get(name)) || tag.group !== 'text') {
            throw 'Invalid element';
        }

        /**
         * Elements tag name
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
