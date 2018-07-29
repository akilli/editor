import Command from './Command.js';

/**
 * Ordered List Command
 */
export default class OrderedListCommand extends Command {
    /**
     * @inheritDoc
     */
    execute() {
        const list = document.createElement('ol');
        const item = document.createElement('li');
        list.appendChild(item);
        item.innerText = 'List Item';
        this.editor.insert(list);
    }
}
