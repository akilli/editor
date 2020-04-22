import Command from '../base/Command.js';

/**
 * Block Command
 */
export default class BlockCommand extends Command {
    /**
     * Inserts block element
     *
     * @param {String} id
     */
    insert({id} = {}) {
        if (!id) {
            throw 'Invalid argument';
        }

        this.editor.insert(this.editor.createElement(this.tagName, {attributes: {
            api: this.editor.config.block.api,
            css: this.editor.config.block.css,
            id,
        }}));
    }
}
