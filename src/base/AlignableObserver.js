import Observer from './Observer.js';

/**
 * Alignable Observer
 */
export default class AlignableObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(records) {
        records.forEach(record => record.addedNodes.forEach(node => {
            if (node instanceof HTMLElement && node.parentElement === this.editor.content && node.hasAttribute('data-alignable')) {
                node.addEventListener('keydown', this);
            }
        }));
    }

    /**
     * Handles key combinations for alignment
     *
     * @private
     * @param {KeyboardEvent} event
     * @param {HTMLElement} event.target
     */
    keydown(event) {
        const map = {ArrowUp: null, ArrowLeft: 'left', ArrowDown: 'center', ArrowRight: 'right'};

        if (event.target === event.currentTarget && this.editor.isKey(event, Object.keys(map), {shift: true})) {
            event.preventDefault();
            event.stopPropagation();
            event.target.classList.remove(...Object.values(map));

            if (map[event.key]) {
                event.target.classList.add(map[event.key]);
            }
        }
    }
}
