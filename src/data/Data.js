import Base from '../base/Base.js';
import DataDialog from './DataDialog.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';

/**
 * Data Plugin
 */
export default class Data extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'data';
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
            name: 'data',
            group: 'format',
            attributes: ['value'],
        });
        this._editor.dialogs.set(new DataDialog(this._editor));
        this._command('data');
        this._toolbar('Data', 'j', true);
    }
}
