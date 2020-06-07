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
        node.addEventListener('keydown', event => {
            this.onKeydownBreak(event);
            this.onKeydownEnter(event);
            this.onKeydownBackspace(event);
        });
    }

    /**
     * Handles break aka shift + enter keydown event
     *
     * @private
     * @param {KeyboardEvent} event
     * @param {HTMLElement} event.target
     */
    onKeydownBreak(event) {
        if (this.editor.isKey(event, 'Enter', {shift: true}) && !this.editor.tags.isAllowed('br', event.target)) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    /**
     * Handles enter keydown event
     *
     * @private
     * @param {KeyboardEvent} event
     * @param {HTMLElement} event.target
     */
    onKeydownEnter(event) {
        let tag;

        if (this.editor.isKey(event, 'Enter')) {
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
        }
    }

    /**
     * Handles backspace keydown event
     *
     * @private
     * @param {KeyboardEvent} event
     * @param {HTMLElement} event.target
     */
    onKeydownBackspace(event) {
        if (this.editor.isKey(event, 'Backspace') && !event.target.textContent && event.target.hasAttribute('data-deletable')) {
            if (event.target.previousElementSibling instanceof HTMLElement) {
                this.editor.focusEnd(event.target.previousElementSibling);
            }

            event.target.parentElement.removeChild(event.target);
            event.preventDefault();
            event.stopPropagation();
        }
    }
}
