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
     * @param {HTMLElement} element
     * @return {void}
     */
    insert({ detail: { element } }) {
        const tag = this.editor.tags.get(element);

        if (tag) {
            if (tag.editable) {
                element.contentEditable = 'true';
            }

            ['alignable', 'arbitrary', 'deletable', 'focusable', 'navigable', 'slotable', 'sortable'].forEach(item => {
                if (tag[item]) {
                    element.dataset[item] = '';
                }
            });
        }
    }
}
