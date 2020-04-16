import Observer from '../base/Observer.js';

/**
 * Figure observer to create missing figcaption elements
 */
export default class FigureObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(item => item.addedNodes.forEach(node => {
            if (node instanceof HTMLElement && node.tagName.toLowerCase() === 'figure' && !node.querySelector(':scope > figcaption')) {
                node.appendChild(this.editor.createElement('figcaption'));
            }
        }));
    }
}
