import Observer from './Observer.js';

/**
 * Deletable Observer
 */
export default class DeletableObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(item => item.addedNodes.forEach(node => {
            if (node instanceof HTMLElement) {
                if (this.deletable(node)) {
                    this.init(node);
                }

                Array.from(node.children).forEach(child => {
                    if (this.deletable(child)) {
                        this.init(child);
                    }
                });
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
        node.tabIndex = 0;
        this.keyboard(node);
    }

    /**
     * Handles keyboard events
     *
     * @private
     * @param {HTMLElement} node
     */
    keyboard(node) {
        node.addEventListener('keyup', ev => {
            if (this.editor.isActive(node) && ev.ctrlKey && ev.key === 'Delete') {
                node.parentElement.removeChild(node);
                ev.preventDefault();
                ev.cancelBubble = true;
            }
        });
    }

    /**
     * Indicates if element is deletable
     *
     * @private
     * @param {HTMLElement} node
     * @return {Boolean}
     */
    deletable(node) {
        const tag = this.editor.tags.get(node.tagName.toLowerCase());

        return tag && tag.deletable;
    }
}
