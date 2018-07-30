import Command from './Command.js';

/**
 * Allowed list tags
 *
 * @type {string[]}
 */
const tags = ['ol', 'ul'];

/**
 * List Command
 */
export default class ListCommand extends Command {
    /**
     * Initializes a new editor command and registers list tag
     *
     * @param {Editor} editor
     * @param {string} tag
     */
    constructor(editor, tag) {
        super(editor);

        if (!tag || !tags.includes(tag) || !this.editor.getTag(tag)) {
            throw 'Invalid heading element';
        }

        /**
         * @type {string}
         * @readonly
         */
        this.tag = tag;
    }

    /**
     * @inheritDoc
     */
    execute() {
        const list = document.createElement(this.tag);
        const item = document.createElement('li');
        list.appendChild(item);
        item.innerText = 'List Item';
        this.editor.insert(list);
    }
}
