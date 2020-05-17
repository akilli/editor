import Command from '../base/Command.js';

/**
 * Block Command
 */
export default class BlockCommand extends Command {
    /**
     * Initializes a new block command
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'block');
    }

    /**
     * Inserts block element
     *
     * @param {String} id
     */
    insert({id} = {}) {
        if (!id) {
            throw 'Invalid argument';
        }

        this.editor.insert(this.editor.createElement('editor-block', {attributes: {id}}));
    }
}
