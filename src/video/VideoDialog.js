import Dialog from '../base/Dialog.js';
import Video from './Video.js';

/**
 * Video Dialog
 */
export default class VideoDialog extends Dialog {
    /**
     * Initializes a new video dialog
     *
     * @param {Editor} editor
     * @param {string|undefined} url
     */
    constructor(editor, url = undefined) {
        super(editor, Video.name, url);
    }

    /**
     * @inheritDoc
     */
    _prepareForm() {
        this.creator
            .addLegend(this._('Video'))
            .addTextInput('src', this._('URL'), {
                pattern: '(https?|/).+',
                placeholder: this._('Insert URL to video'),
                required: 'required',
            })
            .addNumberInput('width', this._('Width'))
            .addNumberInput('height', this._('Height'));
    }
}
