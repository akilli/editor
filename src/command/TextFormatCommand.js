import Command from './Command.js';

/**
 * Allowed text formatting tags
 *
 * @type {string[]}
 */
const tags = ['abbr', 'b', 'cite', 'code', 'data', 'del', 'dfn', 'em', 'i', 'ins', 'kbd', 'mark', 'q', 's', 'small', 'strong', 'sub', 'sup', 'time', 'u', 'var'];

/**
 * Text Format Command
 */
export default class TextFormatCommand extends Command {
    /**
     * Initializes a new editor command and registers text formatting tag
     *
     * @param {Editor} editor
     * @param {string} tag
     */
    constructor(editor, tag) {
        super(editor);

        if (!tag || !tags.includes(tag) || !this.editor.getTag(tag)) {
            throw 'Invalid text formatting element';
        }

        /**
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
