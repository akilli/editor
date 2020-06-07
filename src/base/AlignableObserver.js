import Observer from './Observer.js';

/**
 * Alignable Observer
 */
export default class AlignableObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(record => record.addedNodes.forEach(node => {
            if (node instanceof HTMLElement && node.parentElement === this.editor.content && node.hasAttribute('data-alignable')) {
                this.keyboard(node);
            }
        }));
    }

    /**
     * Handles keyboard events
     *
     * @private
     * @param {HTMLElement} node
     */
    keyboard(node) {
        node.addEventListener('keydown', ev => {
            const map = {ArrowUp: null, ArrowLeft: 'left', ArrowDown: 'center', ArrowRight: 'right'};

            if (ev.target === node && this.editor.isKey(ev, Object.keys(map), {shift: true})) {
                ev.preventDefault();
                ev.stopPropagation();
                node.classList.remove(...Object.values(map));

                if (map[ev.key]) {
                    node.classList.add(map[ev.key]);
                }
            }
        });
    }
}
