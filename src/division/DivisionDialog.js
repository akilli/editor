import Dialog from '../base/Dialog.js';
import Division from './Division.js';
import { TagName } from '../base/enum.js';

/**
 * Division Dialog
 */
export default class DivisionDialog extends Dialog {
    /**
     * Initializes a new div dialog
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, Division.name);
    }

    /**
     * @inheritDoc
     */
    _initFieldset(fieldset) {
        fieldset.appendChild(this.editor.dom.createElement(TagName.LEGEND, { html: this._('Division') }));
        fieldset.appendChild(
            this._createInput('class', 'text', this._('CSS class'), { placeholder: this._('Insert CSS class') }),
        );
    }
}
