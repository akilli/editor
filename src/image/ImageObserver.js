import Observer from '../base/Observer.js';

/**
 * Handles image elements
 */
export default class ImageObserver extends Observer {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.content.addEventListener('sethtml', this);
    }

    /**
     * @inheritDoc
     */
    observe(records) {
        records.forEach(record => {
            record.addedNodes.forEach(node => {
                if (node instanceof HTMLImageElement) {
                    this.init(node);
                } else if (node instanceof HTMLElement) {
                    node.querySelectorAll('img').forEach(item => this.init(item));
                }
            });
        });
    }

    /**
     * Initializes image element
     *
     * @private
     * @param {HTMLImageElement} node
     */
    init(node) {
        this.editor.wrapElement(node, 'figure', {attributes: {class: 'image'}});
    }

    /**
     * Initializes image elements when editor html is set
     *
     * @private
     * @param {CustomEvent} event
     */
    sethtml(event) {
        if (event.detail instanceof HTMLElement) {
            event.detail.querySelectorAll('img').forEach(item => this.init(item));
        }
    }
}
