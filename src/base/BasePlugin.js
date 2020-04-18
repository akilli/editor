import BaseFilter from './BaseFilter.js';
import EditableObserver from './EditableObserver.js';
import Plugin from './Plugin.js';
import WidgetObserver from './WidgetObserver.js';

/**
 * Editor Plugin
 */
export default class BasePlugin extends Plugin {
    /**
     * Initializes a new editor base plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'base');
    }

    /**
     * @inheritDoc
     */
    config() {
        return {lang: null, plugins: [], tags: [], toolbar: []};
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.observe(new EditableObserver(this.editor));
        this.editor.observe(new WidgetObserver(this.editor));
        this.editor.filters.set(new BaseFilter(this.editor, this.name));
    }
}
