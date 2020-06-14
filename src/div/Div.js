import Base from '../base/Base.js';
import DivDialog from './DivDialog.js';
import DivListener from './DivListener.js';
import Plugin from '../base/Plugin.js';
import Slot from '../slot/Slot.js';
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
        return [Base, Slot];
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.tags.set({
            name: 'div',
            group: 'container',
            attributes: ['class'],
            children: ['audio', 'block', 'figure', 'iframe', 'image', 'quote', 'table', 'video'],
            deletable: true,
            focusable: true,
            navigable: true,
            sortable: true,
        });
        this.editor.tags.allow(this.editor.content, 'container');
        new DivListener(this.editor);
        this._translator(i18n);
        this.editor.dialogs.set(new DivDialog(this.editor));
        this._command('div');
        this._toolbar('Division');
    }
}
