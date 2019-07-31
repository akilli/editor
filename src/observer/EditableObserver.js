import Observer from './Observer.js';

/**
 * Editable Observer
 */
export default class EditableObserver extends Observer {
    /**
     * @inheritDoc
     *
     * @param {Editor} editor
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
            if (ev.key === 'Enter' && (!ev.shiftKey || !this.editor.allowed('br', node.tagName))) {
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
