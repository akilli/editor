import Observer from './Observer.js';

/**
 * Editable Observer
 */
export default class EditableObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(records) {
        records.forEach(record => record.addedNodes.forEach(node => {
            if (node instanceof HTMLElement) {
                if (node.isContentEditable) {
                    this.init(node);
                }

                node.querySelectorAll('[contenteditable=true]').forEach(item => this.init(item));
            }
        }));
    }

    /**
     * Initializes editable element
     *
     * @private
     * @param {HTMLElement} node
     */
    init(node) {
        node.addEventListener('keydown', this);
    }

    /**
     * Handles enter and backspace keydown events
     *
     * @private
     * @param {KeyboardEvent} event
     * @param {HTMLElement} event.target
     */
    keydown(event) {
        if (this.editor.isKey(event, 'Enter', {shift: true}) && !this.editor.tags.isAllowed('br', event.target)) {
            event.preventDefault();
            event.stopPropagation();
        } else if (this.editor.isKey(event, 'Enter')) {
            let tag;
            event.preventDefault();
            event.stopPropagation();

            if ((tag = this.editor.tags.get(event.target)) && tag.enter) {
                let current = event.target;

                do {
                    if (this.editor.tags.isAllowed(tag.enter, current.parentElement)) {
                        current.insertAdjacentElement('afterend', this.editor.createElement(tag.enter));
                        break;
                    }
                } while ((current = current.parentElement) && this.editor.content.contains(current) && current !== this.editor.content);
            }
        } else if (this.editor.isKey(event, 'Backspace') && !event.target.textContent && event.target.hasAttribute('data-deletable')) {
            if (event.target.previousElementSibling instanceof HTMLElement) {
                this.editor.focusEnd(event.target.previousElementSibling);
            }

            event.target.parentElement.removeChild(event.target);
            event.preventDefault();
            event.stopPropagation();
        }
    }
}
