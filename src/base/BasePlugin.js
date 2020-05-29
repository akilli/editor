import BaseFilter from './BaseFilter.js';
import DeletableObserver from './DeletableObserver.js';
import EditableObserver from './EditableObserver.js';
import FigureFilter from './FigureFilter.js';
import FigureObserver from './FigureObserver.js';
import FocusObserver from './FocusObserver.js';
import NavigableObserver from './NavigableObserver.js';
import Plugin from './Plugin.js';
import SlotObserver from './SlotObserver.js';
import SortableObserver from './SortableObserver.js';
import ToolbarObserver from './ToolbarObserver.js';

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
        this.editor.tags.set({
            name: 'editor-content',
            group: 'root',
            children: ['figure', 'heading', 'list', 'paragraph', 'section'],
        });
        this.editor.tags.set({
            name: 'slot',
            group: 'slot',
            editable: true,
            navigable: true,
        });
        this.editor.tags.set({
            name: 'br',
            group: 'break',
            empty: true,
        });
        this.editor.tags.set({
            name: 'figure',
            group: 'figure',
            attributes: ['class'],
            children: ['caption', 'figure', 'media', 'quote', 'table'],
            deletable: true,
            navigable: true,
            sortable: true,
        });
        this.editor.tags.set({
            name: 'figcaption',
            group: 'caption',
            children: ['format', 'text'],
            editable: true,
            enter: 'p',
            navigable: true,
        });
        this.editor.observe(new ToolbarObserver(this.editor), {target: this.editor.toolbar});
        this.editor.observe(new EditableObserver(this.editor));
        this.editor.observe(new SlotObserver(this.editor));
        this.editor.observe(new DeletableObserver(this.editor));
        this.editor.observe(new NavigableObserver(this.editor));
        this.editor.observe(new SortableObserver(this.editor));
        this.editor.observe(new FocusObserver(this.editor));
        this.editor.observe(new FigureObserver(this.editor));
        this.editor.filters.set(new BaseFilter(this.editor));
        this.editor.filters.set(new FigureFilter(this.editor));
    }

    /**
     * @inheritDoc
     */
    static defaultConfig() {
        return {browser: {}, filter: {}, lang: null, plugins: [], tags: [], toolbar: []};
    }
}
