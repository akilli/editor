import AudioDialog from './AudioDialog.js';
import AudioListener from './AudioListener.js';
import Base from '../base/Base.js';
import Figure from '../figure/Figure.js';
import Plugin from '../base/Plugin.js';
import TagGroup from '../base/TagGroup.js';
import TagName from '../base/TagName.js';

export default class Audio extends Plugin {
    /**
     * @type {string}
     */
    static get name() {
        return 'audio';
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
            name: TagName.AUDIO,
            group: TagGroup.AUDIO,
            attributes: ['controls', 'id', 'src'],
            empty: true,
            navigable: true,
        });
        new AudioListener(this.editor);
        this.editor.dialogs.set(new AudioDialog(this.editor, this.constructor.name, this.editor.config.audio.browser));
        this._command(TagName.AUDIO);
        this._toolbar('Audio');
    }
}
