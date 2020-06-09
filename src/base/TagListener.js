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
        this.editor.content.addEventListener('insert', this);
    }

    /**
     * Initializes elements
     *
     * @private
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     */
    insert(event) {
        const tag = this.editor.tags.get(event.detail.element);

        if (tag) {
            if (tag.editable) {
                event.detail.element.contentEditable = 'true';
            }

            ['alignable', 'deletable', 'focusable', 'navigable', 'sortable'].forEach(item => {
                if (tag[item]) {
                    event.detail.element.dataset[item] = '';
                }
            });
        }
    }
}
