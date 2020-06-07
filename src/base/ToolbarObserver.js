import Observer from './Observer.js';

/**
 * Toolbar Observer
 */
export default class ToolbarObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(records) {
        records.forEach(record => record.addedNodes.forEach(node => {
            if (node instanceof HTMLElement) {
                if (this.editor.toolbar === node.parentElement || node.hasAttribute('data-command')) {
                    this.init(node);
                }

                node.querySelectorAll('[data-command]').forEach(item => this.init(item));
            }
        }));
    }

    /**
     * Initializes toolbar item
     *
     * @private
     * @param {HTMLElement} node
     */
    init(node) {
        node.addEventListener('click', this);

        if (node.parentElement === this.editor.toolbar) {
            node.tabIndex = -1;
            node.addEventListener('keydown', this);
        }
    }

    /**
     * Handles click events
     *
     * @private
     * @param {MouseEvent} event
     * @param {HTMLElement} event.target
     */
    click(event) {
        this.editor.commands.execute(event.target.getAttribute('data-command'));
    }

    /**
     * Handles key combinations for navigation
     *
     * @private
     * @param {KeyboardEvent} event
     * @param {HTMLElement} event.target
     */
    keydown(event) {
        if (this.editor.isKey(event, ['ArrowLeft', 'ArrowRight', 'Home', 'End'])) {
            const prev = event.target.previousElementSibling;
            const next = event.target.nextElementSibling;
            const first = event.target.parentElement.firstElementChild;
            const last = event.target.parentElement.lastElementChild;
            const isFirst = event.target === first;
            const isLast = event.target === last;

            if (event.key === 'ArrowLeft' && !isFirst) {
                prev.focus();
            } else if (event.key === 'ArrowRight' && !isLast) {
                next.focus();
            } else if (event.key === 'Home' || event.key === 'ArrowRight' && isLast) {
                first.focus();
            } else if (event.key === 'End' || event.key === 'ArrowLeft' && isFirst) {
                last.focus();
            }

            event.preventDefault();
            event.stopPropagation();
        }
    }
}
