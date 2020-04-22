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
        super(editor, 'block', 'editor-block');
    }

    /**
     * Inserts block element
     *
     * @param {String} id
     * @param {String} [content = '']
     */
    insert({id, content = ''} = {}) {
        if (!id) {
            throw 'Invalid argument';
        }

        const block = this.editor.createElement('editor-block', {attributes: {id}});
        block.content = content;
        block.css = this.editor.config.block.css;

        this.editor.insert(block);
    }
}
