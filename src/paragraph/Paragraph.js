import Base from '../base/Base.js';
import Break from '../break/Break.js';
import ParagraphListener from './ParagraphListener.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';
import { TagGroup, TagName } from '../base/enum.js';

/**
 * Paragraph Plugin
 */
export default class Paragraph extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'paragraph';
    }

    /**
     * @inheritDoc
     */
    static get dependencies() {
        return [Base, Break];
    }

    /**
     * @inheritDoc
     */
    init() {
        this._i18n(i18n);
        this._tag({
            name: TagName.P,
            group: TagGroup.PARAGRAPH,
            children: [TagGroup.BREAK, TagGroup.FORMAT],
            deletable: true,
            editable: true,
            focusable: true,
            navigable: true,
            sortable: true,
            enter: TagName.P,
        });
        new ParagraphListener(this.editor);
        this._command(TagName.P);
        this._toolbar(this._('Paragraph'));
    }
}
