import Observer from './Observer.js';

/**
 * Widget Observer
 */
export default class WidgetObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(item => item.addedNodes.forEach(node => {
            if (node instanceof HTMLElement && node.parentElement.isSameNode(this.editor.content)) {
                node.tabIndex = 0;
                node.addEventListener('keyup', ev => this.onKeyUp(ev));
                this.dragndrop(node);
            }
        }));
    }

    /**
     * Handles keyup events
     *
     * @private
     *
     * @param {KeyboardEvent} ev
     */
    onKeyUp(ev) {
        const node = ev.target;

        if (this.editor.document.activeElement.isSameNode(node)) {
            if (ev.key === 'Delete') {
                node.parentElement.removeChild(node);
                ev.preventDefault();
                ev.cancelBubble = true;
            } else if (ev.key === 'ArrowUp' && node.previousElementSibling) {
                node.previousElementSibling.insertAdjacentHTML('beforebegin', node.outerHTML);
                node.parentElement.removeChild(node);
                ev.preventDefault();
                ev.cancelBubble = true;
            } else if (ev.key === 'ArrowDown' && node.nextElementSibling) {
                node.nextElementSibling.insertAdjacentHTML('afterend', node.outerHTML);
                node.parentElement.removeChild(node);
                ev.preventDefault();
                ev.cancelBubble = true;
            }
        }
    }

    /**
     * Adds drag'n'drop support
     *
     * @private
     *
     * @param {HTMLElement} node
     */
    dragndrop(node) {
        const parentName = 'root';
        const keyName = 'text/x-editor-name';
        const keyHtml = 'text/x-editor-html';
        const toggle = () => {
            const isDraggable = node.hasAttribute('draggable');

            this.editor.content.querySelectorAll('[draggable]').forEach(item => {
                item.removeAttribute('draggable');

                if (item.hasAttribute('contenteditable')) {
                    item.setAttribute('contenteditable', 'true');
                }
            });

            if (!isDraggable) {
                node.setAttribute('draggable', 'true');

                if (node.hasAttribute('contenteditable')) {
                    node.setAttribute('contenteditable', 'false');
                }
            }
        };
        const allowDrop = ev => {
            const name = ev.dataTransfer.getData(keyName);

            if (name && this.editor.allowed(name, parentName)) {
                ev.preventDefault();
                node.setAttribute('data-editor-dragover', '');
                ev.dataTransfer.dropEffect = 'move';
            }
        };

        node.addEventListener('dblclick', toggle);
        node.addEventListener('dragstart', ev => {
            ev.dataTransfer.effectAllowed = 'move';
            ev.dataTransfer.setData(keyName, node.tagName.toLowerCase());
            ev.dataTransfer.setData(keyHtml, node.outerHTML);
        });
        node.addEventListener('dragend', ev => {
            if (ev.dataTransfer.dropEffect === 'move') {
                node.parentElement.removeChild(node);
            }

            toggle();
        });
        node.addEventListener('dragenter', allowDrop);
        node.addEventListener('dragover', allowDrop);
        node.addEventListener('dragleave', () => node.removeAttribute('data-editor-dragover'));
        node.addEventListener('drop', ev => {
            const name = ev.dataTransfer.getData(keyName);
            const html = ev.dataTransfer.getData(keyHtml);

            ev.preventDefault();
            node.removeAttribute('data-editor-dragover');

            if (name && this.editor.allowed(name, parentName) && html) {
                node.insertAdjacentHTML('beforebegin', html);
            }
        });
    }
}
