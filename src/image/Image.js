import Base from '../base/Base.js';
import Figure from '../figure/Figure.js';
import ImageDialog from './ImageDialog.js';
import ImageListener from './ImageListener.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

export default class Image extends Plugin {
    /**
     * @type {string}
     */
    static get name() {
        return 'image';
    }

    /**
     * @type {Plugin[]}
     */
    static get dependencies() {
        return [Base, Figure];
    }

    /**
     * @type {Object.<string, any>}
     */
    static get config() {
        return { browser: undefined };
    }

    /**
     * @return {void}
     */
    init() {
        this._tag({
            name: TagName.IMG,
            group: TagGroup.IMAGE,
            attributes: ['alt', 'height', 'id', 'src', 'width'],
            empty: true,
            navigable: true,
        });
        new ImageListener(this.editor);
        this.editor.dialogs.set(new ImageDialog(this.editor, this.editor.config.image.browser));
        this._command(TagName.IMG);
        this._toolbar('Image');
    }
}
