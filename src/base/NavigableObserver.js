import Observer from './Observer.js';

/**
 * Navigable Observer
 */
export default class NavigableObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(records) {
        records.forEach(record => record.addedNodes.forEach(node => {
            if (node instanceof HTMLElement) {
                if (node.hasAttribute('data-navigable')) {
                    this.init(node);
                }

                node.querySelectorAll('[data-navigable]').forEach(item => this.init(item));
            }
        }));
    }

    /**
     * Initializes navigable element
     *
     * @private
     * @param {HTMLElement} node
     */
    init(node) {
        node.tabIndex = 0;
        node.addEventListener('keydown', this);
    }

    /**
     * Handles key combinations for navigation
     *
     * @private
     * @param {KeyboardEvent} event
     * @param {HTMLElement} event.target
     */
    keydown(event) {
        if (event.target === event.currentTarget
            && this.editor.isKey(event, ['ArrowUp', 'ArrowDown', 'Home', 'End'])
            && this.isAllowed(event.target)
        ) {
            const prev = event.target.previousElementSibling;
            const next = event.target.nextElementSibling;
            const first = event.target.parentElement.firstElementChild;
            const last = event.target.parentElement.lastElementChild;
            const isFirst = event.target === first;
            const isLast = event.target === last;

            if (event.key === 'ArrowUp' && !isFirst && prev.hasAttribute('data-navigable')) {
                prev.focus();
            } else if (event.key === 'ArrowDown' && !isLast && next.hasAttribute('data-navigable')) {
                next.focus();
            } else if ((event.key === 'Home' || event.key === 'ArrowDown' && isLast) && first.hasAttribute('data-navigable')) {
                first.focus();
            } else if ((event.key === 'End' || event.key === 'ArrowUp' && isFirst) && last.hasAttribute('data-navigable')) {
                last.focus();
            }

            event.preventDefault();
            event.stopPropagation();
        }
    }

    /**
     * Enables or disables navigation for contenteditable elements
     *
     * @private
     * @param {HTMLElement} node
     * @return {Boolean}
     */
    isAllowed(node) {
        if (!node.isContentEditable) {
            return true;
        }

        const sel = this.editor.window.getSelection();
        const editable = this.editor.getSelectedEditable();
        const element = this.editor.getSelectedElement();

        return sel.isCollapsed && sel.anchorOffset === 0 && [editable, node.firstChild].includes(element);
    }
}
