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
        this._i18n(i18n);
        this._tag({name: 'h2', group: 'heading', deletable: true, editable: true, focusable: true, navigable: true, sortable: true, enter: 'p'});
        this.editor.tags.allow(this.editor.content, 'heading');
        this._command('h2');
        this._toolbar('Heading');
    }
}
