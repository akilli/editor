import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';
import i18n from './i18n.js';

/**
 * Heading Plugin
 */
export default class Heading extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'heading';
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
            name: TagName.H2,
            group: TagGroup.HEADING,
            deletable: true,
            editable: true,
            focusable: true,
            navigable: true,
            sortable: true,
            enter: TagName.P,
        });
        this._command(TagName.H2);
        this._toolbar(this._('Heading'));
    }
}
