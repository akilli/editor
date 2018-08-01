import Command from './Command.js';

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

        let config;

        if (!tag || !(config = this.editor.getTag(tag)) || config.group !== 'heading') {
            throw 'Invalid heading element';
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
        const h = document.createElement(this.tag);
        h.innerText = 'Heading';
        this.editor.insert(h);
    }
}
