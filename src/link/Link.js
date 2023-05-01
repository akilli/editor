import Base from '../base/Base.js';
import LinkDialog from './LinkDialog.js';
import LinkListener from './LinkListener.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';
import { Key } from '../base/Key.js';

export default class Link extends Plugin {
    /**
     * @type {string}
     */
    static get name() {
        return 'link';
    }

    /**
     * @type {Plugin[]}
     */
    static get dependencies() {
        return [Base];
    }

    /**
     * @return {void}
     */
    init() {
        this._tag({ name: TagName.A, group: TagGroup.FORMAT, attributes: ['href'] });
        new LinkListener(this.editor);
        this.editor.dialogs.set(new LinkDialog(this.editor, this.constructor.name));
        this._command(TagName.A);
        this._formatbar('Link', Key.L);
    }
}
