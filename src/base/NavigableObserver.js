import Observer from './Observer.js';

/**
 * Navigable Observer
 */
export default class NavigableObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(record => record.addedNodes.forEach(node => {
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
        this.keyboard(node);
    }

    /**
     * Handles keyboard events
     *
     * @private
     * @param {HTMLElement} node
     */
    keyboard(node) {
        node.addEventListener('keydown', ev => {
            if (ev.target === node && this.editor.isKey(ev, ['ArrowUp', 'ArrowDown', 'Home', 'End']) && this.isAllowed(node)) {
                const prev = node.previousElementSibling;
                const next = node.nextElementSibling;
                const first = node.parentElement.firstElementChild;
                const last = node.parentElement.lastElementChild;
                const isFirst = node === first;
                const isLast = node === last;

                if (ev.key === 'ArrowUp' && !isFirst && prev.hasAttribute('data-navigable')) {
                    prev.focus();
                } else if (ev.key === 'ArrowDown' && !isLast && next.hasAttribute('data-navigable')) {
                    next.focus();
                } else if ((ev.key === 'Home' || ev.key === 'ArrowDown' && isLast) && first.hasAttribute('data-navigable')) {
                    first.focus();
                } else if ((ev.key === 'End' || ev.key === 'ArrowUp' && isFirst) && last.hasAttribute('data-navigable')) {
                    last.focus();
                }

                ev.preventDefault();
                ev.stopPropagation();
            }
        });
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
