import Command from './Command.js';

/**
 * Table Command
 */
export default class TableCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        this.editor.document.execCommand('inserthtml', false, '<table><thead><tr><th></th><th></th></tr></thead><tfoot><tr><td></td><td></td></tr></tfoot><tbody><tr><td></td><td></td></tr></tbody></table>');
    }
}
