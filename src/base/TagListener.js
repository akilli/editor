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
        this._editor.root.addEventListener('insert', this);
    }

    /**
     * Initializes elements
     *
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     */
    insert(event) {
        const tag = this._editor.tags.get(event.detail.element);

        if (tag) {
            if (tag.editable) {
                event.detail.element.contentEditable = 'true';
            }

            ['alignable', 'arbitrary', 'deletable', 'focusable', 'navigable', 'slotable', 'sortable'].forEach(item => {
                if (tag[item]) {
                    event.detail.element.dataset[item] = '';
                }
            });
        }
    }
}
