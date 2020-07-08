import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import SectionDialog from './SectionDialog.js';
import i18n from './i18n.js';

/**
 * Section Plugin
 */
export default class Section extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'section';
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
            name: 'section',
            group: 'container',
            children: ['audio', 'figure', 'heading', 'iframe', 'image', 'list', 'paragraph', 'preformat', 'quote', 'rule', 'table', 'video'],
            attributes: ['class'],
            arbitrary: true,
            deletable: true,
            focusable: true,
            navigable: true,
            slotable: true,
            sortable: true,
        });
        this._editor.dialogs.set(new SectionDialog(this._editor));
        this._command('section');
        this._toolbar('Section');
    }
}
