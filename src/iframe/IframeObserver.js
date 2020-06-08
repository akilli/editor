import Observer from '../base/Observer.js';

/**
 * Handles iframe elements
 */
export default class IframeObserver extends Observer {
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
                if (node instanceof HTMLIFrameElement) {
                    this.init(node);
                } else if (node instanceof HTMLElement) {
                    node.querySelectorAll('iframe').forEach(item => this.init(item));
                }
            });
        });
    }

    /**
     * Initializes iframe element
     *
     * @private
     * @param {HTMLIFrameElement} node
     */
    init(node) {
        node.allowFullscreen = true;
        this.editor.wrap(node, 'figure', {attributes: {class: 'iframe'}});
    }

    /**
     * Initializes iframe elements when editor html is set
     *
     * @private
     * @param {CustomEvent} event
     */
    sethtml(event) {
        if (event.detail instanceof HTMLElement) {
            event.detail.querySelectorAll('iframe').forEach(item => this.init(item));
        }
    }
}
