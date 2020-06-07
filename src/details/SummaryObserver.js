import Observer from '../base/Observer.js';

/**
 * Handles summary elements
 */
export default class SummaryObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(records) {
        records.forEach(record => record.addedNodes.forEach(node => {
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
        this.empty(node);
        node.addEventListener('blur', this);
        node.addEventListener('keydown', this);
    }

    /**
     * Ensures summary element is not empty to avoid strange browser behaviour
     *
     * @private
     * @param {HTMLElement} node
     */
    empty(node) {
        if (!node.textContent.trim()) {
            node.textContent = this.editor.i18n.translate('details', 'Details');
        } else {
            node.querySelectorAll('br:not(:last-child)').forEach(item => item.parentElement.removeChild(item));
        }

        node.lastElementChild instanceof HTMLBRElement || node.appendChild(this.editor.createElement('br'));
    }

    /**
     * Calls empty method on blur
     *
     * @private
     * @param {FocusEvent} ev
     * @param {HTMLElement} ev.target
     */
    blur(ev) {
        this.empty(ev.target);
    }

    /**
     * Fixes space and enter key handling for editable summary elements
     *
     * @private
     * @param {KeyboardEvent} ev
     * @param {HTMLElement} ev.target
     */
    keydown(ev) {
        if (this.editor.isKey(ev, ' ')) {
            ev.preventDefault();
            ev.stopPropagation();
            this.editor.insertText(' ');
        } else if (this.editor.isKey(ev, 'Enter')) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.target.parentElement.open = true;
            ev.target.insertAdjacentElement('afterend', this.editor.createElement('p'));
        }
    }
}
