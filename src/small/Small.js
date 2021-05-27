import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';
import { Key, TagGroup, TagName } from '../base/enum.js';

/**
 * Small Plugin
 */
export default class Small extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'small';
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
            name: TagName.SMALL,
            group: TagGroup.FORMAT,
        });
        this._command(TagName.SMALL);
        this._toolbar('small', Key.W, true);
    }
}
