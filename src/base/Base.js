import AlignCommand from './AlignCommand.js';
import AlignableListener from './AlignableListener.js';
import Alignment from './Alignment.js';
import ContentFilter from './ContentFilter.js';
import DeleteCommand from './DeleteCommand.js';
import DeletableListener from './DeletableListener.js';
import EditableListener from './EditableListener.js';
import FocusableListener from './FocusableListener.js';
import FocusbarListener from './FocusbarListener.js';
import FormatbarListener from './FormatbarListener.js';
import NavigableListener from './NavigableListener.js';
import Plugin from './Plugin.js';
import SlotableListener from './SlotableListener.js';
import SortCommand from './SortCommand.js';
import SortableListener from './SortableListener.js';
import Sorting from './Sorting.js';
import TagGroup from './TagGroup.js';
import TagListener from './TagListener.js';
import ToolbarListener from './ToolbarListener.js';
import TagName from './TagName.js';

export default class Base extends Plugin {
    /**
     * @type {string}
     */
    static get name() {
        return 'base';
    }

    /**
     * @type {Object.<string, any>}
     */
    static get config() {
        return { browser: {}, filter: {}, lang: undefined, plugins: [], pluginsDisabled: false };
    }

    /**
     * @return {void}
     */
    init() {
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
        this.#initAlign();
        this.#initSort();
        this.#initDelete();
    }

    /**
     * @return {void}
     */
    #initAlign() {
        const alignments = {
            [Alignment.NONE]: 'No alignment',
            [Alignment.LEFT]: 'Align left',
            [Alignment.CENTER]: 'Align center',
            [Alignment.RIGHT]: 'Align right',
        };
        Object.entries(alignments).forEach(([alignment, label]) => {
            const command = new AlignCommand(this.editor, alignment);
            this.editor.commands.set(command);
            this._focusbar(label, command.name);
        });
    }

    /**
     * @return {void}
     */
    #initSort() {
        const sortings = {
            [Sorting.FIRST]: 'Sort to the beginning',
            [Sorting.PREV]: 'Sort before previous element',
            [Sorting.NEXT]: 'Sort after next element',
            [Sorting.LAST]: 'Sort to the end',
        };
        Object.entries(sortings).forEach(([sorting, label]) => {
            const command = new SortCommand(this.editor, sorting);
            this.editor.commands.set(command);
            this._focusbar(label, command.name);
        });
    }

    /**
     * @return {void}
     */
    #initDelete() {
        this.editor.commands.set(new DeleteCommand(this.editor));
        this._focusbar('Delete', 'delete');
    }
}
