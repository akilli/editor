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
            }
        }));
    }

    /**
     * Handles keyup events
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
}
