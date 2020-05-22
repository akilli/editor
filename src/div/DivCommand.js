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
     * Inserts, updates or removes div element
     *
     * @protected
     * @param {String} css
     */
    insert({css} = {}) {
        this.editor.insert(this.editor.createElement('div', {attributes: {class: css}}));
    }
}
