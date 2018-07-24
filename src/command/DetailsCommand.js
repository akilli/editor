import Command from './Command.js';

/**
 * Details Command
 */
export default class DetailsCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        this.editor.document.execCommand('inserthtml', false, '<details><summary>Summary</summary><p>Content</p></details>');
    }
}
