import Base from '../base/Base.js';
import Key from '../base/Key.js';
import LinkDialog from './LinkDialog.js';
import LinkListener from './LinkListener.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

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
        this._tag({ name: TagName.A, group: TagGroup.FORMAT, attributes: ['href'] });
        new LinkListener(this.editor);
        this.editor.dialogs.set(new LinkDialog(this.editor));
        this._command(TagName.A);
        this._formatbar(this._('Link'), Key.L);
    }
}
