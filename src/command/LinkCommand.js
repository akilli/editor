import TextCommand from './TextCommand.js';

/**
 * Link Command
 */
export default class LinkCommand extends TextCommand {
    /**
     * Initializes a new editor command and registers tag
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
        let src;

        if (src = this.editor.window.prompt('URL')) {
            const a = document.createElement(this.tag.name);
            a.setAttribute('src', src);
            this.editor.formatText(a);
        }
    }
}
