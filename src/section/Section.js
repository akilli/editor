import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import SectionDialog from './SectionDialog.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

export default class Section extends Plugin {
    /**
     * @type {string}
     */
    static get name() {
        return 'section';
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
            name: TagName.SECTION,
            group: TagGroup.CONTAINER,
            children: [
                TagGroup.AUDIO,
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
            attributes: ['class'],
            arbitrary: true,
            deletable: true,
            focusable: true,
            navigable: true,
            slotable: true,
            sortable: true,
        });
        this.editor.dialogs.set(new SectionDialog(this.editor));
        this._command(TagName.SECTION);
        this._toolbar('Section');
    }
}
