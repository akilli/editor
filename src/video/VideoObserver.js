import Observer from '../base/Observer.js';

/**
 * Handles video elements
 */
export default class VideoObserver extends Observer {
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
                if (node instanceof HTMLVideoElement) {
                    this.init(node);
                } else if (node instanceof HTMLElement) {
                    node.querySelectorAll('video').forEach(item => this.init(item));
                }
            });
        });
    }

    /**
     * Initializes video element
     *
     * @private
     * @param {HTMLVideoElement} node
     */
    init(node) {
        node.controls = true;
        this.editor.wrapElement(node, 'figure', {attributes: {class: 'video'}});
    }

    /**
     * Initializes video elements when editor html is set
     *
     * @private
     * @param {CustomEvent} event
     */
    sethtml(event) {
        if (event.detail instanceof HTMLElement) {
            event.detail.querySelectorAll('video').forEach(item => this.init(item));
        }
    }
}
