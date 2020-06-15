import Base from '../base/Base.js';
import Break from '../break/Break.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';

/**
 * Paragraph Plugin
 */
export default class Paragraph extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'paragraph';
    }

    /**
     * @inheritDoc
     */
    static get dependencies() {
        return [Base, Break];
    }

    /**
     * @inheritDoc
     */
    init() {
        this._i18n(i18n);
        this._tag({
            name: 'p',
            group: 'paragraph',
            children: ['break', 'format'],
            deletable: true,
            editable: true,
            focusable: true,
            navigable: true,
            sortable: true,
            enter: 'p',
        });
        this.editor.tags.allow(this.editor.content, 'paragraph');
        this._command('p');
        this._toolbar('Paragraph');
    }
}
