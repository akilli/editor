import Command from '../base/Command.js';
import Delete from './Delete.js';

export default class DeleteCommand extends Command {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, Delete.name);
    }

    /**
     * @return {void}
     */
    execute() {
        const element = this.editor.dom.getActiveElement();

        if (element?.hasAttribute('data-deletable')) {
            this.editor.dom.delete(element);
        }
    }
}
