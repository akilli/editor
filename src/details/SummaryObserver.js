import Observer from '../base/Observer.js';

/**
 * Handles summary elements
 */
export default class SummaryObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(item => item.addedNodes.forEach(node => {
            if (node instanceof HTMLElement && node.tagName.toLowerCase() === 'summary') {
                this.init(node);
            } else if (node instanceof HTMLElement) {
                node.querySelectorAll('summary').forEach(summary => this.init(summary));
            }
        }));
    }

    /**
     * Initializes summary element
     *
     * @private
     * @param {HTMLElement} node
     */
    init(node) {
        // Ensure summary is not empty
        const call = () => {
            if (!node.textContent.trim()) {
                node.textContent = this.editor.translator.get('details', 'Details');
            }
        };
        call();
        node.addEventListener('blur', call);
        // Fix space key for editable summary elements
        node.addEventListener('keydown', ev => {
            if (ev.key === ' ') {
                ev.preventDefault();
                ev.cancelBubble = true;
            }
        });
        node.addEventListener('keyup', ev => {
            if (ev.key === ' ') {
                this.editor.insertText(' ');
                ev.preventDefault();
                ev.cancelBubble = true;
            }
        });
    }
}
