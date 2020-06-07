import Observer from '../base/Observer.js';

/**
 * Handles summary elements
 */
export default class SummaryObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(record => record.addedNodes.forEach(node => {
            if (node instanceof HTMLElement && node.localName === 'summary') {
                this.init(node);
            } else if (node instanceof HTMLElement) {
                node.querySelectorAll('summary').forEach(item => this.init(item));
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
                node.textContent = this.editor.i18n.translate('details', 'Details');
            }
        };
        call();
        node.addEventListener('blur', call);
        // Fix space key for editable summary elements
        node.addEventListener('keydown', ev => {
            if (ev.key === ' ') {
                ev.preventDefault();
                ev.stopPropagation();
                this.editor.insertText(' ');
            }
        });
    }
}
