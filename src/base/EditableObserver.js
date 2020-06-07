import Observer from './Observer.js';

/**
 * Editable Observer
 */
export default class EditableObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(record => record.addedNodes.forEach(node => {
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
        node.addEventListener('keydown', ev => {
            this.onKeydownBreak(ev);
            this.onKeydownEnter(ev);
            this.onKeydownBackspace(ev);
        });
    }

    /**
     * Handles break aka shift + enter keydown event
     *
     * @private
     * @param {KeyboardEvent} ev
     * @param {HTMLElement} ev.target
     */
    onKeydownBreak(ev) {
        if (this.editor.isKey(ev, 'Enter', {shift: true}) && !this.editor.tags.isAllowed('br', ev.target)) {
            ev.preventDefault();
            ev.stopPropagation();
        }
    }

    /**
     * Handles enter keydown event
     *
     * @private
     * @param {KeyboardEvent} ev
     * @param {HTMLElement} ev.target
     */
    onKeydownEnter(ev) {
        let tag;

        if (this.editor.isKey(ev, 'Enter')) {
            ev.preventDefault();
            ev.stopPropagation();

            if ((tag = this.editor.tags.get(ev.target)) && tag.enter) {
                let current = ev.target;

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
     * @param {KeyboardEvent} ev
     * @param {HTMLElement} ev.target
     */
    onKeydownBackspace(ev) {
        if (this.editor.isKey(ev, 'Backspace') && !ev.target.textContent && ev.target.hasAttribute('data-deletable')) {
            if (ev.target.previousElementSibling instanceof HTMLElement) {
                this.editor.focusEnd(ev.target.previousElementSibling);
            }

            ev.target.parentElement.removeChild(ev.target);
            ev.preventDefault();
            ev.stopPropagation();
        }
    }
}
