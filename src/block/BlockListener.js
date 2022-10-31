import Listener from '../base/Listener.js';
import { TagName } from '../base/enum.js';

/**
 * Block listener to set API and CSS
 */
export default class BlockListener extends Listener {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        this.editor.root.addEventListener('sethtml', this);
        this.editor.root.addEventListener('insertappblock', this);
    }

    /**
     * Filters block elements without id when editor html is set
     *
     * @param {HTMLElement} element
     * @return {void}
     */
    sethtml({ detail: { element } }) {
        Array.from(element.getElementsByTagName(TagName.BLOCK)).forEach(
            /** @param {HTMLElement} item */
            item => item.id || item.parentElement.removeChild(item),
        );
    }

    /**
     * Removes block element if no id is set or sets block content from API if configured
     *
     * @param {BlockElement} element
     * @return {Promise<void>}
     */
    async insertappblock({ detail: { element } }) {
        if (!element.id) {
            element.parentElement.removeChild(element);
            return;
        }

        if (!this.editor.config.block.api) {
            return;
        }

        const url = this.editor.config.block.api.replace('{id}', element.id);
        const response = await fetch(url, { mode: 'no-cors' });

        if (!response.ok) {
            return;
        }

        let css = '';

        if (this.editor.config.block.css) {
            css = this.editor.config.block.css
                .split(',')
                .map(item => `<link rel="stylesheet" href="${item}">`)
                .join('');
        }

        const content = await response.text();
        element.content = css + content;
    }
}
