import Base from '../base/Base.js';
import DetailsFilter from './DetailsFilter.js';
import DetailsListener from './DetailsListener.js';
import Plugin from '../base/Plugin.js';
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
        return [Base];
    }

    /**
     * @inheritDoc
     */
    init() {
        this._i18n(i18n);
        this._tag({
            name: 'details',
            group: 'container',
            deletable: true,
            focusable: true,
            navigable: true,
            slotable: true,
            sortable: true,
        });
        this._tag({name: 'summary', group: 'summary', editable: true, navigable: true, enter: 'p'});
        this.editor.tags.allow(this.editor.content, 'container');
        this.editor.tags.allow('details', 'audio', 'figure', 'iframe', 'image', 'list', 'paragraph', 'quote', 'summary', 'table', 'video');
        new DetailsListener(this.editor);
        this._command('details');
        this._toolbar('Details');
        this.editor.filters.add(new DetailsFilter(this.editor));
    }
}
