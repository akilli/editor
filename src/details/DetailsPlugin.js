import DetailsCommand from './DetailsCommand.js';
import DetailsFilter from './DetailsFilter.js';
import DetailsObserver from './DetailsObserver.js';
import Plugin from '../base/Plugin.js';
import SummaryObserver from './SummaryObserver.js';
import i18n from './i18n.js';

/**
 * Details Plugin
 */
export default class DetailsPlugin extends Plugin {
    /**
     * Initializes a new details plugin
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'details');
    }

    /**
     * @inheritDoc
     */
    init() {
        this.editor.tags.set({
            name: 'details',
            group: 'section',
            children: ['figure', 'list', 'paragraph', 'summary'],
            deletable: true,
            navigable: true,
            sortable: true,
        });
        this.editor.tags.set({
            name: 'summary',
            group: 'summary',
            children: ['text'],
            editable: true,
            enter: 'p',
            navigable: true,
        });
        this.editor.observe(new DetailsObserver(this.editor));
        this.editor.observe(new SummaryObserver(this.editor));
        this.registerTranslator(i18n);
        this.editor.commands.set(new DetailsCommand(this.editor));
        this.editor.filters.set(new DetailsFilter(this.editor));
    }
}
