import Editor from './Editor.js';

/**
 * Event Manager
 */
export default class EventManager {
    /**
     * Editor
     *
     * @type {Editor}
     */
    editor;

    /**
     * Initializes a new event manager
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        if (!(editor instanceof Editor)) {
            throw 'Invalid argument';
        }

        this.editor = editor;
        const toolbar = new MutationObserver(records => this.observe(records, this.toolbar.bind(this)));
        toolbar.observe(this.editor.toolbar, {childList: true, subtree: true});
        const content = new MutationObserver(records => this.observe(records, this.content.bind(this)));
        content.observe(this.editor.content, {childList: true, subtree: true});
    }

    /**
     * Dispatches an event on editor toolbar element
     *
     * @param {String} type
     * @param {*} [detail = null]
     */
    toolbar(type, detail = null) {
        this.editor.toolbar.dispatchEvent(new CustomEvent(type, {detail: detail}));
    }

    /**
     * Dispatches an event on editor content element
     *
     * @param {String} type
     * @param {*} [detail = null]
     */
    content(type, detail = null) {
        this.editor.content.dispatchEvent(new CustomEvent(type, {detail: detail}));
    }

    /**
     * Observes mutations on given element
     *
     * @private
     * @param {MutationRecord[]} records
     * @param {Function} call
     */
    observe(records, call) {
        const dispatch = (type, element, target) => {
            call(type, {element, target});
            call(`${type}${element.localName.replace('-', '')}`, {element, target});
        };
        records.forEach(record => {
            record.addedNodes.forEach(element => {
                if (element instanceof HTMLElement) {
                    dispatch('insert', element, record.target);
                    element.querySelectorAll('*').forEach(item => dispatch('insert', item, record.target));
                }
            });
            record.removedNodes.forEach(element => element instanceof HTMLElement && dispatch('delete', element, record.target));
        });
    }
}
