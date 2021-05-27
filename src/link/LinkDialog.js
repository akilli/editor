import Dialog from '../base/Dialog.js';
import Link from './Link.js';
import { TagName } from '../base/enum.js';

/**
 * Link Dialog
 */
export default class LinkDialog extends Dialog {
    /**
     * Initializes a new link dialog
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, Link.name);
    }

    /**
     * @inheritDoc
     */
    _initFieldset(fieldset) {
        fieldset.appendChild(this.editor.dom.createElement(TagName.LEGEND, { html: this._('Link') }));
        fieldset.appendChild(this._createInput('href', 'text', this._('URL'), {
            pattern: '(https?|/|mailto:|tel:).+',
            placeholder: this._('Insert link or leave empty to unlink'),
        }));
    }
}
