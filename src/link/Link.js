import Base from '../base/Base.js';
import LinkDialog from './LinkDialog.js';
import LinkListener from './LinkListener.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';

/**
 * Link Plugin
 */
export default class Link extends Plugin {
    /**
     * @inheritDoc
     */
    static get name() {
        return 'link';
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
            name: 'a',
            group: 'format',
            attributes: ['href'],
        });
        new LinkListener(this.editor);
        this.editor.dialogs.set(new LinkDialog(this.editor));
        this._command('a');
        this._toolbar('Link', 'l', true);
    }
}
