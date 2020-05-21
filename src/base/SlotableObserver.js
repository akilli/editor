import Observer from './Observer.js';

/**
 * Slotable Observer
 */
export default class SlotableObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        const slotables = this.slotables();
        const selector = slotables.join(', ');

        ev.forEach(item => item.addedNodes.forEach(node => {
            if (node instanceof HTMLElement && slotables.includes(node.tagName.toLowerCase())) {
                this.init(node);
            } else if (selector && node instanceof HTMLElement) {
                node.querySelectorAll(selector).forEach(slotable => this.init(slotable))
            }
        }));
    }

    /**
     * Slotable tags
     *
     * @private
     * @return {String[]}
     */
    slotables() {
        return [...this.editor.tags].reduce((result, item) => {
            if (item[1].slotable) {
                result.push(item[1].name);
            }

            return result;
        }, []);
    }

    /**
     * Initializes slotable element
     *
     * @private
     * @param {HTMLElement} node
     */
    init(node) {
        if (!node.querySelector(':scope > slot')) {
            const call = (ev) => {
                ev.preventDefault();
                ev.cancelBubble = true;
            };
            const slot = this.editor.createElement('slot');
            slot.contentEditable = 'true';
            slot.addEventListener('keydown', call);
            slot.addEventListener('keyup', call);
            node.appendChild(slot);
        }
    }
}
