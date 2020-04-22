import BaseFilter from './BaseFilter.js';
import EditableObserver from './EditableObserver.js';
import FigureFilter from './FigureFilter.js';
import FigureObserver from './FigureObserver.js';
import Plugin from './Plugin.js';
import WidgetObserver from './WidgetObserver.js';

/**
 * Base Plugin
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
    init() {
        this.registerTag({name: 'root', group: 'root', children: ['details', 'figure', 'heading', 'list', 'paragraph', 'section']});
        this.registerTag({name: 'br', group: 'break', empty: true});
        this.registerTag({name: 'figure', group: 'figure', attributes: ['class'], children: ['caption', 'media', 'quote', 'table']});
        this.registerTag({name: 'figcaption', group: 'caption', children: ['text'], editable: true, enter: 'p'});
        this.editor.observe(new EditableObserver(this.editor));
        this.editor.observe(new WidgetObserver(this.editor));
        this.editor.observe(new FigureObserver(this.editor));
        this.editor.filters.set(new BaseFilter(this.editor, this.name));
        this.editor.filters.set(new FigureFilter(this.editor, 'figure'));
    }

    /**
     * @inheritDoc
     */
    static defaultConfig() {
        return {browser: {}, lang: null, plugins: [], tags: [], toolbar: []};
    }
}
