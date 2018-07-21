import Command from './command.js';

/**
 * Simple Command
 */
export default class SimpleCommand extends Command {
    /**
     * Initializes a new simple command
     *
     * @param {Editor} editor
     * @param {string} tag
     */
    constructor(editor, tag) {
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
        const html = this.editor.window.getSelection().toString();

        if (html) {
            this.editor.execute('insertHTML', '<' + this.tag + '>' + html + '</' + this.tag + '>');
        }
    }
}
