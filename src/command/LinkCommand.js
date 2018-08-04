import TextCommand from './TextCommand.js';

/**
 * Link Command
 */
export default class LinkCommand extends TextCommand {
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
        let href;

        if (href = this.editor.window.prompt('URL')) {
            const a = this.editor.document.createElement(this.tag.name);
            a.setAttribute('href', href);
            this.editor.formatText(a);
        }
    }
}
