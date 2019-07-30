import Observer from './Observer.js';

/**
 * Drag'n'drop for widgets
 */
export default class DraggableObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(item => item.addedNodes.forEach(node => {
            if (node instanceof HTMLElement && this.editor.content.isSameNode(node.parentElement)) {
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
        }));
    }
}
