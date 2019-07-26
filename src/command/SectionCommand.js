import Command from './Command.js';

/**
 * Section Command
 */
export default class SectionCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        const section = this.editor.document.createElement('section');
        const h = this.editor.document.createElement('h2');
        const p = this.editor.document.createElement('p');

        section.appendChild(h);
        section.appendChild(p);

        this.editor.insert(section);
    }
}
