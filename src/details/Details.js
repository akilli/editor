import Base from '../base/Base.js';
import DetailsFilter from './DetailsFilter.js';
import DetailsListener from './DetailsListener.js';
import Plugin from '../base/Plugin.js';
import Slot from '../slot/Slot.js';
import SummaryListener from './SummaryListener.js';
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
        this.editor.tags.set({
            name: 'details',
            group: 'container',
            children: ['audio', 'figure', 'iframe', 'image', 'list', 'paragraph', 'quote', 'summary', 'table', 'video'],
            deletable: true,
            focusable: true,
            navigable: true,
            sortable: true,
        });
        this.editor.tags.allow(this.editor.content, 'container');
        this.editor.tags.set({name: 'summary', group: 'summary', editable: true, enter: 'p', navigable: true});
        new DetailsListener(this.editor);
        new SummaryListener(this.editor);
        this._translator(i18n);
        this._command('details');
        this._button('Details');
        this.editor.filters.add(new DetailsFilter(this.editor));
    }
}
