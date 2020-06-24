import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import TimeDialog from './TimeDialog.js';
import i18n from './i18n.js';

/**
 * Time Plugin
 */
export default class Time extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'time';
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
            name: 'time',
            group: 'format',
            attributes: ['datetime'],
        });
        this.editor.dialogs.set(new TimeDialog(this.editor));
        this._command('time');
        this._toolbar('Time', 't');
    }
}
