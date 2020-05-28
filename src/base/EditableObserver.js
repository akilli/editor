import Observer from './Observer.js';

/**
 * Editable Observer
 */
export default class EditableObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        const names = this.editor.tags.editable();
        const selector = names.join(', ');

        ev.forEach(item => item.addedNodes.forEach(node => {
            if (node instanceof HTMLElement && names.includes(node.tagName.toLowerCase())) {
                this.init(node);
            } else if (node instanceof HTMLElement && selector) {
                node.querySelectorAll(selector).forEach(item => this.init(item))
            }
        }));
    }

    /**
     * Editable element callback
     *
     * @private
     * @param {HTMLElement} node
     */
    init(node) {
        node.contentEditable = 'true';
        node.addEventListener('keydown', ev => {
            this.onKeydownEnter(ev);
            this.onKeydownBackspace(ev);
        });
        node.addEventListener('keyup', ev => this.onKeyupEnter(ev));
    }

    /**
     * Handles enter keydown event
     *
     * @private
     * @param {KeyboardEvent} ev
     */
    onKeydownEnter(ev) {
        if (ev.key === 'Enter' && (!ev.shiftKey || !this.editor.tags.isAllowed('br', ev.target.tagName.toLowerCase()))) {
            ev.preventDefault();
            ev.cancelBubble = true;
        }
    }

    /**
     * Handles enter keyup event
     *
     * @private
     * @param {KeyboardEvent} ev
     */
    onKeyupEnter(ev) {
        let tag;

        if (ev.key === 'Enter' && !ev.shiftKey && (tag = this.editor.tags.get(ev.target.tagName.toLowerCase())) && tag.enter) {
            let current = ev.target;
            let parentName;

            ev.preventDefault();
            ev.cancelBubble = true;

            do {
                parentName = current.parentElement.tagName.toLowerCase();

                if (this.editor.tags.isAllowed(tag.enter, parentName)) {
                    current.insertAdjacentElement('afterend', this.editor.createElement(tag.enter));
                    break;
                }
            } while ((current = current.parentElement) && this.editor.content.contains(current) && !this.editor.isContent(current));
        }
    }

    /**
     * Handles backspace keydown event
     *
     * @private
     * @param {KeyboardEvent} ev
     */
    onKeydownBackspace(ev) {
        if (ev.key === 'Backspace' && !ev.shiftKey && !ev.target.textContent && this.editor.tags.isElementDeletable(ev.target)) {
            if (ev.target.previousElementSibling) {
                this.editor.focusEnd(ev.target.previousElementSibling);
            }

            ev.target.parentElement.removeChild(ev.target);
            ev.preventDefault();
            ev.cancelBubble = true;
        }
    }
}
