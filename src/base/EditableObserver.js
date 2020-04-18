import Observer from './Observer.js';

/**
 * Editable Observer
 */
export default class EditableObserver extends Observer {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);

        /**
         * Editables
         *
         * @type {String[]}
         * @readonly
         */
        this.editables = [...this.editor.tags].reduce((result, item) => {
            if (item[1].editable) {
                result.push(item[1].name);
            }

            return result;
        }, []);
    }

    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(item => item.addedNodes.forEach(node => {
            if (node instanceof HTMLElement && this.editables.includes(node.tagName.toLowerCase())) {
                this.toEditable(node);
            } else if (node instanceof HTMLElement) {
                node.querySelectorAll(this.editables.join(', ')).forEach(ed => this.toEditable(ed))
            }
        }));
    }

    /**
     * Editable element callback
     *
     * @private
     *
     * @param {HTMLElement} node
     */
    toEditable(node) {
        node.contentEditable = 'true';
        node.focus();
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
     *
     * @param {KeyboardEvent} ev
     */
    onKeydownEnter(ev) {
        if (ev.key === 'Enter' && (!ev.shiftKey || !this.editor.allowed('br', ev.target.tagName.toLowerCase()))) {
            ev.preventDefault();
            ev.cancelBubble = true;
        }
    }

    /**
     * Handles enter keyup event
     *
     * @private
     *
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
                parentName = this.editor.getTagName(current.parentElement);

                if (this.editor.allowed(tag.enter, parentName)) {
                    current.insertAdjacentElement('afterend', this.editor.createElement(tag.enter));
                    break;
                }
            } while ((current = current.parentElement) && this.editor.content.contains(current) && !this.editor.isRoot(current));
        }
    }

    /**
     * Handles backspace keydown event
     *
     * @private
     *
     * @param {KeyboardEvent} ev
     */
    onKeydownBackspace(ev) {
        const widget = this.editor.getSelectedWidget();
        const allowed = ['blockquote', 'details', 'ol', 'ul'].includes(ev.target.parentElement.tagName.toLowerCase())
            && (ev.target.tagName.toLowerCase() !== 'summary' || ev.target.matches(':only-child'));

        if (ev.key === 'Backspace' && !ev.shiftKey && !ev.target.textContent && widget && (widget.isSameNode(ev.target) || allowed)) {
            const target = widget.isSameNode(ev.target) || ev.target.matches(':only-child') ? widget : ev.target;

            if (target.previousElementSibling) {
                this.editor.focusEnd(target.previousElementSibling);
            }

            target.parentElement.removeChild(target);
            ev.preventDefault();
            ev.cancelBubble = true;
        }
    }
}
