import Base from '../base/Base.js';
import DetailsFilter from './DetailsFilter.js';
import DetailsListener from './DetailsListener.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

export default class Details extends Plugin {
    /**
     * @type {string}
     */
    static get name() {
        return 'details';
    }

    /**
     * @type {Plugin[]}
     */
    static get dependencies() {
        return [Base];
    }

    /**
     * @return {void}
     */
    init() {
        this._tag({
            name: TagName.DETAILS,
            group: TagGroup.CONTAINER,
            children: [
                TagGroup.AUDIO,
                TagGroup.FIGURE,
                TagGroup.IFRAME,
                TagGroup.IMAGE,
                TagGroup.LIST,
                TagGroup.PARAGRAPH,
                TagGroup.PREFORMAT,
                TagGroup.QUOTE,
                TagGroup.RULE,
                TagGroup.SUMMARY,
                TagGroup.TABLE,
                TagGroup.VIDEO,
            ],
            arbitrary: true,
            deletable: true,
            focusable: true,
            navigable: true,
            slotable: true,
            sortable: true,
        });
        this._tag({
            name: TagName.SUMMARY,
            group: TagGroup.SUMMARY,
            editable: true,
            navigable: true,
            enter: TagName.P,
        });
        new DetailsListener(this.editor);
        this._command(TagName.DETAILS);
        this._toolbar('Details');
        this.editor.filters.add(new DetailsFilter(this.editor));
    }
}
