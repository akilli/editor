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
            throw 'No list element';
        }
    }

    /**
     * @inheritDoc
     */
    insert(data = {}) {
        const list = this.editor.createElement(this.tag.name);
        list.appendChild(this.editor.createElement('li'));
        this.editor.insert(list);
    }
}
