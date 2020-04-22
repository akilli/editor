import Command from '../base/Command.js';

/**
 * List Command
 */
export default class ListCommand extends Command {
    /**
     * @inheritDoc
     */
    insert(attributes = {}) {
        const list = this.editor.createElement(this.tagName);
        list.appendChild(this.editor.createElement('li'));

        this.editor.insert(list);
    }
}
