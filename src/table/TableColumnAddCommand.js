import Command from '../base/Command.js';
import TagName from '../base/TagName.js';

export default class TableColumnAddCommand extends Command {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'tablecolumn-add');
    }

    /**
     * @return {void}
     */
    execute() {
        const element = this.editor.dom.getActiveElement();
        element?.localName === TagName.COL && this.editor.dom.createTableColumnAfter(element);
    }
}
