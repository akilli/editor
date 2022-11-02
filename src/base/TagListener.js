import Listener from './Listener.js';

export default class TagListener extends Listener {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('insert', this);
    }

    /**
     * @param {CustomEvent} event
     * @param {HTMLElement} event.detail.element
     * @return {void}
     */
    insert({ detail: { element } }) {
        const tag = this.editor.tags.get(element);

        if (tag) {
            if (tag.editable) {
                element.contentEditable = 'true';
            }

            ['alignable', 'arbitrary', 'deletable', 'focusable', 'navigable', 'slotable', 'sortable'].forEach(
                (item) => {
                    if (tag[item]) {
                        element.dataset[item] = '';
                    }
                }
            );
        }
    }
}
