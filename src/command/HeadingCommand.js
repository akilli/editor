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
     * Initializes a new editor command and registers heading tag
     *
     * @param {Editor} editor
     * @param {string} tag
     */
    constructor(editor, tag) {
        super(editor);

        if (!tag || !tags.includes(tag) || !this.editor.getTag(tag)) {
            throw 'Invalid heading element';
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
        const h = document.createElement(this.tag);
        h.innerText = 'Heading';
        this.editor.insert(h);
    }
}
