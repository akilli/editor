import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import SectionDialog from './SectionDialog.js';
import SectionListener from './SectionListener.js';
import Slot from '../slot/Slot.js';
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
        return [Base, Slot];
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.tags.create({
            name: 'section',
            group: 'container',
            attributes: ['class'],
            children: ['figure', 'heading', 'list', 'paragraph'],
            deletable: true,
            focusable: true,
            navigable: true,
            sortable: true,
        });
        new SectionListener(this.editor);
        this.registerTranslator(i18n);
        this.editor.dialogs.set(new SectionDialog(this.editor));
        this.registerCommand('section', 'section');
    }
}
