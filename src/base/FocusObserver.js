import Observer from './Observer.js';

/**
 * Focus Observer
 */
export default class FocusObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(item => item.addedNodes.forEach(node => {
            if (this.editor.tags.isNavigable(node) || this.editor.tags.isEditable(node)) {
                node.tabIndex = 0;
                node.focus();
            }
        }));
    }
}
