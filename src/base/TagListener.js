import Listener from './Listener.js';

/**
 * Tag Listener
 */
export default class TagListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('insert', this);
    }

    /**
     * Initializes elements
     *
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     */
    insert(event) {
        const tag = this.editor.tags.get(event.detail.element);

        if (tag) {
            if (tag.editable) {
                event.detail.element.contentEditable = 'true';
            }

            ['alignable', 'deletable', 'focusable', 'navigable', 'slotable', 'sortable'].forEach(item => {
                if (tag[item]) {
                    event.detail.element.dataset[item] = '';
                }
            });

            if (tag.group === 'format') {
                event.detail.element.addEventListener('click', this);
            }
        }
    }

    /**
     * Handles click events
     *
     * @param {MouseEvent} event
     * @param {HTMLElement} event.target
     */
    click(event) {
        Array.from(this.editor.commands.values()).find(item => item.tag?.name === event.target.localName)?.execute();
    }
}
