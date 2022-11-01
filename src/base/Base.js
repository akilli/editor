import AlignableListener from './AlignableListener.js';
import ContentFilter from './ContentFilter.js';
import DeletableListener from './DeletableListener.js';
import DialogElement from './DialogElement.js';
import EditableListener from './EditableListener.js';
import FocusableListener from './FocusableListener.js';
import FocusbarListener from './FocusbarListener.js';
import FormatbarListener from './FormatbarListener.js';
import NavigableListener from './NavigableListener.js';
import Plugin from './Plugin.js';
import SlotableListener from './SlotableListener.js';
import SortableListener from './SortableListener.js';
import TagGroup from './TagGroup.js';
import TagListener from './TagListener.js';
import ToolbarListener from './ToolbarListener.js';
import TagName from './TagName.js';
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
        return { browser: {}, filter: {}, lang: undefined, plugins: [], pluginsDisabled: false };
    }

    /**
     * @inheritDoc
     */
    init() {
        this._i18n(i18n);
        this.editor.dom.registerElement(TagName.DIALOG, DialogElement);
        this._tag({
            name: TagName.ROOT,
            group: TagGroup.ROOT,
            children: [
                TagGroup.AUDIO,
                TagGroup.BLOCK,
                TagGroup.CONTAINER,
                TagGroup.FIGURE,
                TagGroup.HEADING,
                TagGroup.IFRAME,
                TagGroup.IMAGE,
                TagGroup.LIST,
                TagGroup.PARAGRAPH,
                TagGroup.PREFORMAT,
                TagGroup.QUOTE,
                TagGroup.RULE,
                TagGroup.TABLE,
                TagGroup.VIDEO,
            ],
        });
        this._tag({
            name: TagName.SLOT,
            group: TagGroup.SLOT,
            editable: true,
            focusable: true,
            navigable: true,
            sortable: true,
        });
        new TagListener(this.editor);
        new ToolbarListener(this.editor);
        new FormatbarListener(this.editor);
        new FocusbarListener(this.editor);
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
