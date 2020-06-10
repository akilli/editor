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
     * @protected
     * @param {String} id
     */
    _insert({id} = {}) {
        if (!id) {
            throw 'Invalid argument';
        }

        this.editor.insert(this.editor.createElement('app-block', {attributes: {id}}));
    }
}
