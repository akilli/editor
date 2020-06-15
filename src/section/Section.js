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
            attributes: ['class'],
            deletable: true,
            focusable: true,
            navigable: true,
            slotable: true,
            sortable: true,
        });
        this.editor.tags.allow(this.editor.content, 'container');
        this.editor.tags.allow('section', 'audio', 'figure', 'heading', 'iframe', 'image', 'list', 'paragraph', 'quote', 'table', 'video');
        this.editor.dialogs.set(new SectionDialog(this.editor));
        this._command('section');
        this._toolbar('Section');
    }
}
