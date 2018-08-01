import Command from './Command.js';

/**
 * Heading Command
 */
export default class HeadingCommand extends Command {
    /**
     * Initializes a new editor command and registers heading tag
     *
     * @param {Editor} editor
     * @param {String} name
     * @param {String} tagName
     */
    constructor(editor, name, tagName) {
        super(editor, name);

        let tag;

        if (!tagName || !(tag = this.editor.tags.get(tagName)) || tag.group !== 'heading') {
            throw 'Invalid heading element';
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
        const h = document.createElement(this.tag.name);
        h.innerText = 'Heading';
        this.editor.insert(h);
    }
}
