import Command from './Command.js';

/**
 * Allowed heading tags
 *
 * @type {string[]}
 */
const tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

/**
 * Heading Command
 */
export default class HeadingCommand extends Command {
    /**
     * Initializes a new heading command
     *
     * @param {Editor} editor
     * @param {string} tag
     */
    constructor(editor, tag) {
        if (!tags.includes(tag)) {
            throw 'Invalid heading';
        }

        super(editor);

        /**
         * Tag name
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
        this.editor.execute('formatblock', '<' + this.tag + '>');
    }
}
