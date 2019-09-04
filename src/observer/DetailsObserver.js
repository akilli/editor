import Observer from './Observer.js';

/**
 * Handles details and summary elements
 */
export default class DetailsObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(item => item.addedNodes.forEach(node => {
            if (node instanceof HTMLDetailsElement) {
                this.initDetails(node);
            } else if (node instanceof HTMLElement) {
                node.querySelectorAll('details').forEach(item => this.initDetails(item));
            }
        }));
    }

    /**
     * Initializes details element
     *
     * @private
     *
     * @param {HTMLDetailsElement} node
     */
    initDetails(node) {
        let first = node.firstElementChild;

        if (first instanceof HTMLElement && first.tagName.toLowerCase() === 'summary') {
            this.initSummary(first);

            if (node.childElementCount === 1) {
                node.appendChild(this.editor.document.createElement('p'));
            }
        } else if (first instanceof HTMLElement) {
            const summary = this.editor.document.createElement('summary');
            node.insertBefore(summary, first);
            this.initSummary(summary);
        }
    }

    /**
     * Initializes summary element
     *
     * @private
     *
     * @param {HTMLElement} node
     */
    initSummary(node) {
        // Ensure summary is not empty
        const call = () => {
            if (!node.innerText.trim()) {
                node.innerText = 'Details';
            }
        };
        call();
        node.addEventListener('blur', call);
        // Fix space key for editable summary elements
        node.addEventListener('keydown', ev => {
            if (ev.key === ' ') {
                ev.preventDefault();
            }
        });
        node.addEventListener('keyup', ev => {
            if (ev.key === ' ') {
                ev.preventDefault();
                this.editor.insertText(' ');
            }
        });
    }
}
