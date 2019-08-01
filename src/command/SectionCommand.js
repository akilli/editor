import Command from './Command.js';

/**
 * Section Command
 */
export default class SectionCommand extends Command {
    /**
     * @inheritDoc
     */
    insert() {
        const section = this.editor.document.createElement('section');
        section.appendChild(this.editor.document.createElement('h2'));
        section.appendChild(this.editor.document.createElement('p'));
        this.editor.insert(section);
    }
}
