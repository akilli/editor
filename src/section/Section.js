import Plugin from '../base/Plugin.js';
import SectionCommand from './SectionCommand.js';
import SectionDialog from './SectionDialog.js';
import SectionObserver from './SectionObserver.js';
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
    init() {
        this.editor.tags.create({
            name: 'section',
            group: 'container',
            attributes: ['class'],
            children: ['figure', 'heading', 'list', 'paragraph'],
            deletable: true,
            navigable: true,
            sortable: true,
        });
        this.editor.observe(new SectionObserver(this.editor));
        this.registerTranslator(i18n);
        this.editor.dialogs.set(new SectionDialog(this.editor));
        this.editor.commands.set(new SectionCommand(this.editor));
    }
}
