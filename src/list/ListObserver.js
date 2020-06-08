import Observer from '../base/Observer.js';

/**
 * Handles list elements
 */
export default class ListObserver extends Observer {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.content.addEventListener('sethtml', this);
    }

    /**
     * @inheritDoc
     */
    observe(records) {
        records.forEach(record => {
            record.addedNodes.forEach(node => {
                if (node instanceof HTMLElement) {
                    if (node instanceof HTMLOListElement || node instanceof HTMLUListElement) {
                        this.initList(node);
                    } else if (node instanceof HTMLLIElement) {
                        this.initItem(node);
                    }

                    node.querySelectorAll('ol, ul').forEach(item => this.initList(item));
                    node.querySelectorAll('li').forEach(item => this.initItem(item));
                }
            });

            if (record.removedNodes.length > 0
                && (record.target instanceof HTMLOListElement || record.target instanceof HTMLUListElement)
                && record.target.children.length === 0
            ) {
                record.target.parentElement.removeChild(record.target);
            }
        });
    }

    /**
     * Initializes list element
     *
     * @private
     * @param {HTMLOListElement|HTMLUListElement} node
     */
    initList(node) {
        if (node.children.length === 0) {
            node.appendChild(this.editor.createElement('li'));
        }
    }

    /**
     * Initializes list item element
     *
     * @private
     * @param {HTMLLIElement} node
     */
    initItem(node) {
        if (!(node.parentElement instanceof HTMLOListElement) && !(node.parentElement instanceof HTMLUListElement)) {
            this.editor.wrapElement(node, 'ul');
        }
    }

    /**
     * Initializes list item elements when editor html is set
     *
     * @private
     * @param {CustomEvent} event
     */
    sethtml(event) {
        if (event.detail instanceof HTMLElement) {
            event.detail.querySelectorAll('li').forEach(item => this.initItem(item));
        }
    }
}
