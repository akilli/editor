import Base from '../base/Base.js';
import Command from '../base/Command.js';
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
        this.editor.tags.allow(this.editor.content, 'container');
        new SectionListener(this.editor);

        if (i18n[this.editor.config.base.lang]) {
            this.editor.i18n.set('section', i18n[this.editor.config.base.lang]);
        }

        this.editor.dialogs.set(new SectionDialog(this.editor));
        this.editor.commands.set(new Command(this.editor, 'section', 'section'));
    }
}
