import Command from './Command.js';

export default class DeleteCommand extends Command {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'delete');
    }

    /**
     * @return {void}
     */
    execute() {
        const element = this.editor.dom.getActiveElement();
        element?.hasAttribute('data-deletable') && this.editor.dom.delete(element);
    }
}
