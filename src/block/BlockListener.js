import BlockElement from './BlockElement.js';
import Listener from '../base/Listener.js';

/**
 * Block listener to set API and CSS
 */
export default class BlockListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.content.addEventListener('insertappblock', this);
    }

    /**
     * Sets block content from API
     *
     * @private
     * @param {CustomEvent} event
     * @param {BlockElement} event.detail.element
     */
    async insertappblock(event) {
        if (!event.detail.element.id || !this.editor.config.block.api) {
            return;
        }

        try {
            const response = await fetch(this.editor.config.block.api.replace('{id}', event.detail.element.id), {mode: 'no-cors'});

            if (response.ok) {
                let css = '';

                if (this.editor.config.block.css) {
                    css = this.editor.config.block.css.split(',').map(item => `<link rel="stylesheet" href="${item}">`).join('');
                }

                const content = await response.text();
                event.detail.element.content = css + content;
            }
        } catch (e) {
            console.error(e);
        }
    }
}
