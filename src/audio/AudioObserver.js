import Observer from '../base/Observer.js';

/**
 * Handles audio elements
 */
export default class AudioObserver extends Observer {
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
                if (node instanceof HTMLAudioElement) {
                    this.init(node);
                } else if (node instanceof HTMLElement) {
                    node.querySelectorAll('audio').forEach(item => this.init(item));
                }
            });
        });
    }

    /**
     * Initializes audio element
     *
     * @private
     * @param {HTMLAudioElement} node
     */
    init(node) {
        node.controls = true;
        this.editor.wrap(node, 'figure', {attributes: {class: 'audio'}});
    }

    /**
     * Initializes audio elements when editor html is set
     *
     * @private
     * @param {CustomEvent} event
     */
    sethtml(event) {
        if (event.detail instanceof HTMLElement) {
            event.detail.querySelectorAll('audio').forEach(item => this.init(item));
        }
    }
}
