import Observer from './Observer.js';

/**
 * Navigable Observer
 */
export default class NavigableObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        const names = this.editor.tags.navigable();
        const selector = names.join(', ');

        ev.forEach(item => item.addedNodes.forEach(node => {
            if (node instanceof HTMLElement && names.includes(node.tagName.toLowerCase())) {
                this.keyboard(node);
            } else if (node instanceof HTMLElement && selector) {
                node.querySelectorAll(selector).forEach(item => this.keyboard(item))
            }
        }));
    }

    /**
     * Handles keyboard events
     *
     * @private
     * @param {HTMLElement} node
     */
    keyboard(node) {
        node.addEventListener('keyup', ev => {
            if (this.editor.isActive(node) && !ev.ctrlKey && ['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(ev.key)) {
                const prev = node.previousElementSibling;
                const next = node.nextElementSibling;
                const first = node.parentElement.firstElementChild;
                const last = node.parentElement.lastElementChild;
                const isFirst = first.isSameNode(node);
                const isLast = last.isSameNode(node);

                if (ev.key === 'ArrowUp' && !isFirst) {
                    prev.focus();
                } else if (ev.key === 'ArrowDown' && !isLast) {
                    next.focus();
                } else if (ev.key === 'Home' || ev.key === 'ArrowDown' && isLast) {
                    first.focus();
                } else if (ev.key === 'End' || ev.key === 'ArrowUp' && isFirst) {
                    last.focus();
                }

                ev.preventDefault();
                ev.cancelBubble = true;
            }
        });
    }
}
