import Command from './Command.js';

/**
 * List Command
 */
export default class ListCommand extends Command {
    /**
     * @inheritDoc
     */
    constructor(editor, tagName) {
        super(editor, tagName);

        if (!this.tag || this.tag.group !== 'list') {
            throw 'Invalid list element';
        }
    }

    /**
     * @inheritDoc
     */
    execute() {
        const list = this.editor.document.createElement(this.tag.name);
        const item = this.editor.document.createElement('li');

        list.appendChild(item);
        this.editor.insert(list);
    }
}
