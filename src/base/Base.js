import AlignableListener from './AlignableListener.js';
import ContentFilter from './ContentFilter.js';
import DeletableListener from './DeletableListener.js';
import EditableListener from './EditableListener.js';
import FocusableListener from './FocusableListener.js';
import NavigableListener from './NavigableListener.js';
import Plugin from './Plugin.js';
import SlotableListener from './SlotableListener.js';
import SortableListener from './SortableListener.js';
import TagListener from './TagListener.js';
import ToolbarListener from './ToolbarListener.js';
import i18n from './i18n.js';

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
        return {browser: {}, filter: {}, lang: null, plugins: [], tags: []};
    }

    /**
     * @inheritDoc
     */
    init() {
        this._i18n(i18n);
        this._tag({name: 'editor-content', group: 'root'});
        this._tag({name: 'slot', group: 'slot', editable: true, focusable: true, navigable: true});
        new ToolbarListener(this.editor);
        new TagListener(this.editor);
        new EditableListener(this.editor);
        new DeletableListener(this.editor);
        new NavigableListener(this.editor);
        new SortableListener(this.editor);
        new AlignableListener(this.editor);
        new FocusableListener(this.editor);
        new SlotableListener(this.editor);
        this.editor.filters.add(new ContentFilter(this.editor));
    }
}
