import Base from '../base/Base.js';
import Key from '../base/Key.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

/**
 * Insertion Plugin
 */
export default class Insertion extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'insertion';
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
        this._tag({ name: TagName.INS, group: TagGroup.FORMAT });
        this._command(TagName.INS);
        this._formatbar('Text Insertion', Key.F);
    }
}
