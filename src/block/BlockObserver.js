import BlockElement from './BlockElement.js';
import Observer from '../base/Observer.js';

/**
 * Block observer to set API and CSS
 */
export default class BlockObserver extends Observer {
    /**
     * @inheritDoc
     */
    observe(ev) {
        ev.forEach(item => item.addedNodes.forEach(node => {
            if (node instanceof BlockElement && node.id && this.editor.config.block.api) {
                this.init(node);
            } else if (node instanceof HTMLElement) {
                node.querySelectorAll('editor-block').forEach(block => this.init(block));
            }
        }));
    }

    /**
     * Sets block content from API
     *
     * @private
     * @param {BlockElement} node
     */
    async init(node) {
        if (!node.id || !this.editor.config.block.api) {
            return;
        }

        try {
            const response = await fetch(this.editor.config.block.api.replace('{id}', node.id), {mode: 'no-cors'});

            if (response.ok) {
                let css = '';

                if (this.editor.config.block.css) {
                    css = this.editor.config.block.css.split(',').map(item => `<link rel="stylesheet" href="${item}">`).join('');
                }

                const content = await response.text();
                node.content = css + content;
            }
        } catch (e) {
            console.error(e);
        }
    }
}
