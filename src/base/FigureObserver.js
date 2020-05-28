import Observer from './Observer.js';

/**
 * Figure observer to create missing figcaption elements
 */
export default class FigureObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(item => item.addedNodes.forEach(node => {
            if (node instanceof HTMLElement && node.tagName.toLowerCase() === 'figure') {
                this.init(node);
            } else if (node instanceof HTMLElement) {
                node.querySelectorAll('figure').forEach(figure => this.init(figure));
            }
        }));
    }

    /**
     * Initializes figure element
     *
     * @private
     * @param {HTMLElement} node
     */
    init(node) {
        if (!node.querySelector(':scope > figcaption')) {
            node.appendChild(this.editor.createElement('figcaption'));
        }

        if (node.parentElement instanceof HTMLElement && this.editor.isContent(node.parentElement)) {
            this.keyboard(node);
        }
    }

    /**
     * Handles keyboard events
     *
     * @private
     * @param {HTMLElement} node
     */
    keyboard(node) {
        node.addEventListener('keyup', ev => {
            const map = {ArrowLeft: 'left', ArrowRight: 'right'};

            if (ev.target === node && ev.ctrlKey && Object.keys(map).includes(ev.key)) {
                ev.preventDefault();
                ev.cancelBubble = true;
                const contains = map[ev.key] && node.classList.contains(map[ev.key]);
                node.classList.remove(...Object.values(map));

                if (!contains) {
                    node.classList.add(map[ev.key]);
                }
            }
        });
    }
}
