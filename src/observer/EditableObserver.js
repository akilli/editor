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
            const widget = this.editor.getSelectedWidget();
            const allowed = ['blockquote', 'ol', 'ul'].includes(node.parentElement.tagName.toLowerCase());

            if (ev.key === 'Enter' && (!ev.shiftKey || !this.editor.allowed('br', node.tagName))) {
                ev.preventDefault();
                ev.cancelBubble = true;
            } else if (ev.key === 'Backspace' && !ev.shiftKey && !node.textContent && widget && (widget.isSameNode(node) || allowed)) {
                const target = widget.isSameNode(node) || allowed && !node.matches(':only-child') ? node : widget;

                if (target.previousElementSibling) {
                    this.editor.focusEnd(target.previousElementSibling);
                }

                target.parentElement.removeChild(target);
                ev.preventDefault();
                ev.cancelBubble = true;
            }
        });
        node.addEventListener('keyup', ev => {
            let tag;

            if (ev.key === 'Enter' && !ev.shiftKey && (tag = this.editor.getTag(node.tagName)) && tag.enter) {
                let current = node;
                let parentName;

                ev.preventDefault();
                ev.cancelBubble = true;

                do {
                    parentName = this.editor.getTagName(current.parentElement);

                    if (this.editor.allowed(tag.enter, parentName)) {
                        const newElement = this.editor.document.createElement(tag.enter);
                        this.editor.insert(newElement, current);
                        break;
                    }
                } while ((current = current.parentElement) && this.editor.content.contains(current) && !this.editor.content.isSameNode(current));
            }
        });
    }
}
