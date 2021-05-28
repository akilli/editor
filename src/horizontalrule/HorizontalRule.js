import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';
import { TagGroup, TagName } from '../base/enum.js';

/**
 * Horizontal Rule Plugin
 */
export default class HorizontalRule extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'horizontalrule';
    }

    /**
     * @inheritDoc
     */
    static get dependencies() {
        return [Base];
    }

    /**
     * @inheritDoc
     */
    init() {
        this._i18n(i18n);
        this._tag({
            name: TagName.HR,
            group: TagGroup.RULE,
            deletable: true,
            empty: true,
            focusable: true,
            navigable: true,
            sortable: true,
        });
        this._command(TagName.HR);
        this._toolbar(this._('Horizontal Rule'));
    }
}
