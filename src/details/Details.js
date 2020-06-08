import Base from '../base/Base.js';
import DetailsFilter from './DetailsFilter.js';
import DetailsObserver from './DetailsObserver.js';
import Plugin from '../base/Plugin.js';
import Slot from '../slot/Slot.js';
import SummaryObserver from './SummaryObserver.js';
import i18n from './i18n.js';

/**
 * Details Plugin
 */
export default class Details extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'details';
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
            name: 'details',
            group: 'container',
            children: ['figure', 'list', 'paragraph', 'summary'],
            deletable: true,
            focusable: true,
            navigable: true,
            sortable: true,
        });
        this.editor.tags.create({
            name: 'summary',
            group: 'summary',
            editable: true,
            navigable: true,
        });
        this.editor.observe(new DetailsObserver(this.editor));
        this.editor.observe(new SummaryObserver(this.editor));
        this.registerTranslator(i18n);
        this.registerCommand('details', 'details');
        this.editor.filters.add(new DetailsFilter(this.editor));
    }
}
