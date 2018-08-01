import TextCommand from './TextCommand.js';

/**
 * Link Command
 */
export default class LinkCommand extends TextCommand {
    /**
     * Initializes a new editor command with given name and registers tag
     *
     * @param {Editor} editor
     * @param {String} name
     */
    constructor(editor, name) {
        super(editor, name, 'a');
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
