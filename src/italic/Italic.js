import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';

/**
 * Italic Plugin
 */
export default class Italic extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'italic';
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
        this.editor.tags.create({name: 'i', group: 'format'});
        this._translator(i18n);
        this._command('italic', 'i');
        this._button('italic');
    }
}
