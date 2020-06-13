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
        this.editor.tags.set({
            name: 'p',
            group: 'paragraph',
            children: ['break', 'format'],
            deletable: true,
            editable: true,
            enter: 'p',
            focusable: true,
            navigable: true,
            sortable: true,
        });
        this.editor.tags.allow(this.editor.content, 'paragraph');
        this._translator(i18n);
        this._command('paragraph', 'p');
        this._button(this._('Paragraph'));
    }
}
