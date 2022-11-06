import Command from '../base/Command.js';

export default class TableRowAddCommand extends Command {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'tablerow-add');
    }

    /**
     * @return {void}
     */
    execute() {
        const element = this.editor.dom.getActiveElement();
        element instanceof HTMLTableRowElement && this.editor.dom.createTableRowAfter(element);
    }
}
