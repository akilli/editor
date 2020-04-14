import EditableObserver from './EditableObserver.js';
import Plugin from './Plugin.js';
import WidgetObserver from './WidgetObserver.js';

/**
 * Editor Plugin
 */
export default class EditorPlugin extends Plugin {
    /**
     * Initializes a new editor plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'editor');
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.observe(new EditableObserver(this.editor, 'editable'));
        this.editor.observe(new WidgetObserver(this.editor, 'widget'));
    }
}
