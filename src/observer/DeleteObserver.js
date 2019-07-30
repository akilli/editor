import Observer from './Observer.js';

/**
 * Delete widgets
 */
export default class DeleteObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(item => item.addedNodes.forEach(node => {
            if (node instanceof HTMLElement && node.parentElement.isSameNode(this.editor.content)) {
                node.tabIndex = 0;
                node.addEventListener('keyup', ev => {
                    if (ev.key === 'Delete' && this.editor.document.activeElement.isSameNode(node)) {
                        node.parentElement.removeChild(node);
                    }
                });
            }
        }));
    }
}
