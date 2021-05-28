import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';
import { Key, TagGroup, TagName } from '../base/enum.js';

/**
 * Deletion Plugin
 */
export default class Deletion extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'deletion';
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
            name: TagName.DEL,
            group: TagGroup.FORMAT,
        });
        this._command(TagName.DEL);
        this._formatbar('Text Deletion', Key.G);
    }
}
