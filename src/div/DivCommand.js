import Command from '../base/Command.js';

/**
 * Div Command
 */
export default class DivCommand extends Command {
    /**
     * Initializes a new div command
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'div');
    }

    /**
     * Inserts div element
     *
     * @protected
     * @param {String} css
     */
    insert({css} = {}) {
        const div = this.editor.createElement('div', {attributes: {class: css}});
        div.appendChild(this.editor.createElement('slot'));
        this.editor.insert(div);
    }
}
