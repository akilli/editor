import AbbreviationDialog from './AbbreviationDialog.js';
import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';

/**
 * Abbreviation Plugin
 */
export default class Abbreviation extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'abbreviation';
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
            name: 'abbr',
            group: 'format',
            attributes: ['title'],
        });
        this._editor.dialogs.set(new AbbreviationDialog(this._editor));
        this._command('abbr');
        this._toolbar('Abbreviation', 'a', true);
    }
}
