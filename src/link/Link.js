import Base from '../base/Base.js';
import LinkDialog from './LinkDialog.js';
import LinkListener from './LinkListener.js';
import Plugin from '../base/Plugin.js';
import i18n from './i18n.js';
import { Key, TagGroup, TagName } from '../base/enum.js';

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
        this._tag({ name: TagName.A, group: TagGroup.FORMAT, attributes: ['href'] });
        new LinkListener(this.editor);
        this.editor.dialogs.set(new LinkDialog(this.editor));
        this._command(TagName.A);
        this._formatbar(this._('Link'), Key.L);
    }
}
