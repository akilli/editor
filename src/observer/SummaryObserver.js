import Observer from './Observer.js';

/**
 * Fix space key for editable summary elements
 */
export default class SummaryObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(item => item.addedNodes.forEach(node => {
            if (node instanceof HTMLElement && node.tagName.toLowerCase() === 'summary'
                || node instanceof HTMLDetailsElement && (node = node.querySelector('summary'))
            ) {
                const call = () => {
                    if (!node.innerText.trim()) {
                        node.innerText = 'Details';
                    }
                };
                call();
                node.addEventListener('blur', call);
                node.addEventListener('keydown', ev => {
                    if (ev.key === ' ') {
                        ev.preventDefault();
                    }
                });
                node.addEventListener('keyup', ev => {
                    if (ev.key === ' ') {
                        ev.preventDefault();
                        this.editor.insertText(' ');
                    }
                });
            }
        }));
    }
}
