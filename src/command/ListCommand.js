import Command from './Command.js';

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

        let config;

        if (!tag || !(config = this.editor.getTag(tag)) || config.group !== 'list') {
            throw 'Invalid heading element';
        }

        /**
         * Elements tag name
         *
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
