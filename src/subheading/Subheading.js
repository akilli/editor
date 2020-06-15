import Base from '../base/Base.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';

/**
 * Subheading Plugin
 */
export default class Subheading extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'subheading';
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
        this._translator(i18n);
        this._tag({
            name: 'h3',
            group: 'heading',
            deletable: true,
            editable: true,
            focusable: true,
            navigable: true,
            sortable: true,
            enter: 'p',
        });
        this.editor.tags.allow(this.editor.content, 'heading');
        this._command('h3');
        this._toolbar('Subheading');
    }
}
