import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';

/**
 * Heading Plugin
 */
export default class Heading extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'heading';
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
        this.editor.tags.create({
            name: 'h2',
            group: 'heading',
            deletable: true,
            editable: true,
            enter: 'p',
            focusable: true,
            navigable: true,
            sortable: true,
        });
        this.editor.tags.allow(this.editor.content, 'heading');
        this._translator(i18n);
        this._command('heading', 'h2');
        this._button('Heading');
    }
}
