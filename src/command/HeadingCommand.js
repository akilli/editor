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
     */
    constructor(editor, name) {
        super(editor);

        let tag;

        if (!name || !(tag = this.editor.tags.get(name)) || tag.group !== 'heading') {
            throw 'Invalid heading element';
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
        const h = document.createElement(this.tag.name);
        h.innerText = 'Heading';
        this.editor.insert(h);
    }
}
