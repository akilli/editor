import Command from './Command.js';

/**
 * Details Command
 */
export default class DetailsCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        const details = this.editor.document.createElement('details');
        const summary = this.editor.document.createElement('summary');
        const content = this.editor.document.createElement('p');

        details.appendChild(summary);
        details.appendChild(content);
        summary.innerHTML = 'Summary';
        content.innerHTML = 'Content';

        this.editor.document.execCommand('inserthtml', false, details.outerHTML);
    }
}
