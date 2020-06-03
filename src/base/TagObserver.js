import Observer from './Observer.js';

/**
 * Tag Observer
 */
export default class TagObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(record => record.addedNodes.forEach(node => {
            if (node instanceof HTMLElement) {
                this.init(node);
                node.querySelectorAll('*').forEach(item => this.init(item));
            }
        }));
    }

    /**
     * Initializes element
     *
     * @private
     * @param {HTMLElement} node
     */
    init(node) {
        const tag = this.editor.tags.get(node);

        if (tag) {
            if (tag.editable) {
                node.contentEditable = 'true';
            }

            ['deletable', 'empty', 'navigable', 'sortable'].forEach(item => tag[item] && (node.dataset[item] = ''));
        }
    }
}
