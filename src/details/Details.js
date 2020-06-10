import Base from '../base/Base.js';
import Command from '../base/Command.js';
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
        this.editor.tags.create({
            name: 'details',
            group: 'container',
            children: ['figure', 'list', 'paragraph', 'summary'],
            deletable: true,
            focusable: true,
            navigable: true,
            sortable: true,
        });
        this.editor.tags.create({name: 'summary', group: 'summary', editable: true, enter: 'p', navigable: true});
        new DetailsListener(this.editor);
        new SummaryListener(this.editor);
        this._translator(i18n);
        this.editor.commands.set(new Command(this.editor, 'details', 'details'));
        this.editor.filters.add(new DetailsFilter(this.editor));
    }
}
