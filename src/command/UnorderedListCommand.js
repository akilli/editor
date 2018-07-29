import Command from './Command.js';

/**
 * Unordered List Command
 */
export default class UnorderedListCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        const list = document.createElement('ul');
        const item = document.createElement('li');
        list.appendChild(item);
        item.innerText = 'List Item';
        this.editor.insert(list);
    }
}
