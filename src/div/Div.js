import Base from '../base/Base.js';
import DivDialog from './DivDialog.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';

/**
 * Div Plugin
 */
export default class Div extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'div';
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
            name: 'div',
            group: 'container',
            children: ['audio', 'block', 'figure', 'iframe', 'image', 'quote', 'table', 'video'],
            attributes: ['class'],
            deletable: true,
            focusable: true,
            navigable: true,
            slotable: true,
            sortable: true,
        });
        this.editor.dialogs.set(new DivDialog(this.editor));
        this._command('div');
        this._toolbar('Division');
    }
}
