import DivDialog from './DivDialog.js';
import DivObserver from './DivObserver.js';
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
    init() {
        this.editor.tags.create({
            name: 'div',
            group: 'container',
            attributes: ['class'],
            children: ['block', 'figure'],
            deletable: true,
            focusable: true,
            navigable: true,
            sortable: true,
        });
        this.editor.observe(new DivObserver(this.editor));
        this.registerTranslator(i18n);
        this.editor.dialogs.set(new DivDialog(this.editor));
        this.registerCommand('div', 'div');
    }
}
