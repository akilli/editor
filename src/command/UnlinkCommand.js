import TextCommand from './TextCommand.js';

/**
 * Unlink Command
 */
export default class UnlinkCommand extends TextCommand {
    /**
     * Initializes a new editor command
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'a');
    }

    /**
     * @inheritDoc
     */
    execute() {
        if (this.editor.getSelectedEditable()) {
            this.editor.document.execCommand('unlink');
        }
    }
}
