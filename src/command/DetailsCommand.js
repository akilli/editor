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
        const p = this.editor.document.createElement('p');

        details.appendChild(summary);
        details.appendChild(p);
        summary.innerText = 'Details';
        this.editor.insert(details);
    }
}
