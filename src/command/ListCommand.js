import Command from './Command.js';

/**
 * List Command
 */
export default class ListCommand extends Command {
    /**
     * Initializes a new editor command and registers list tag
     *
     * @param {Editor} editor
     * @param {String} name
     */
    constructor(editor, name) {
        super(editor);

        let tag;

        if (!name || !(tag = this.editor.tags.get(name)) || tag.group !== 'list') {
            throw 'Invalid heading element';
        }

        /**
         * Tag
         *
         * @type {Tag}
         * @readonly
         */
        this.tag = tag;
    }

    /**
     * @inheritDoc
     */
    execute() {
        const list = document.createElement(this.tag.name);
        const item = document.createElement('li');
        list.appendChild(item);
        item.innerText = 'List Item';
        this.editor.insert(list);
    }
}
