import BaseFilter from './BaseFilter.js';
import DeletableObserver from './DeletableObserver.js';
import EditableObserver from './EditableObserver.js';
import FigureFilter from './FigureFilter.js';
import FigureObserver from './FigureObserver.js';
import NavigableObserver from './NavigableObserver.js';
import Plugin from './Plugin.js';
import SlotObserver from './SlotObserver.js';
import SortableObserver from './SortableObserver.js';
import TagObserver from './TagObserver.js';
import ToolbarObserver from './ToolbarObserver.js';

/**
 * Base Plugin
 */
export default class Base extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'base';
    }

    /**
     * @inheritDoc
     */
    static get config() {
        return {browser: {}, filter: {}, lang: null, plugins: [], tags: [], toolbar: []};
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.tags.create({
            name: 'editor-content',
            group: 'root',
            children: ['block', 'container', 'figure', 'heading', 'list', 'paragraph'],
        });
        this.editor.tags.create({
            name: 'slot',
            group: 'slot',
            editable: true,
            navigable: true,
        });
        this.editor.tags.create({
            name: 'br',
            group: 'break',
            empty: true,
        });
        this.editor.tags.create({
            name: 'figure',
            group: 'figure',
            attributes: ['class'],
            children: ['caption', 'figure', 'media', 'quote', 'table'],
            deletable: true,
            navigable: true,
            sortable: true,
        });
        this.editor.tags.create({
            name: 'figcaption',
            group: 'caption',
            children: ['format'],
            editable: true,
            enter: 'p',
            navigable: true,
        });
        this.editor.observe(new TagObserver(this.editor));
        this.editor.observe(new ToolbarObserver(this.editor), {target: this.editor.toolbar});
        this.editor.observe(new EditableObserver(this.editor));
        this.editor.observe(new SlotObserver(this.editor));
        this.editor.observe(new DeletableObserver(this.editor));
        this.editor.observe(new NavigableObserver(this.editor));
        this.editor.observe(new SortableObserver(this.editor));
        this.editor.observe(new FigureObserver(this.editor));
        this.editor.filters.add(new BaseFilter(this.editor));
        this.editor.filters.add(new FigureFilter(this.editor));
    }
}
