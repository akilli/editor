import Filter from './Filter.js';

/**
 * Content filter
 */
export default class ContentFilter extends Filter {
    /**
     * @inheritDoc
     */
    filter(parent) {
        const parentName = this.editor.getTagName(parent);
        const isRoot = this.editor.isRoot(parent);
        parent.normalize();
        Array.from(parent.childNodes).forEach(node => {
            if (node instanceof HTMLElement) {
                node = this.editor.convert(node);
            }

            if (node instanceof HTMLElement) {
                const name = node.tagName.toLowerCase();
                const tag = this.editor.tags.get(name);
                const text = node.textContent.trim();

                if (tag && (this.editor.allowed(name, parentName) || isRoot && tag.group === 'text' && this.editor.allowed('p', parentName))) {
                    Array.from(node.attributes).forEach(item => {
                        if (!tag.attributes.includes(item.name)) {
                            node.removeAttribute(item.name);
                        }
                    });

                    if (node.hasChildNodes()) {
                        this.editor.filter(node);
                    }

                    if (!node.hasChildNodes() && !tag.empty) {
                        parent.removeChild(node);
                    } else if (!this.editor.allowed(name, parentName)) {
                        parent.replaceChild(this.editor.createElement('p', {}, node.outerHTML), node);
                    }
                } else if (isRoot && text && this.editor.allowed('p', parentName)) {
                    parent.replaceChild(this.editor.createElement('p', {}, text), node);
                } else if (text && this.editor.allowed('text', parentName)) {
                    parent.replaceChild(this.editor.createText(text), node);
                } else {
                    parent.removeChild(node);
                }
            } else if (node instanceof Text) {
                const text = node.textContent.trim();

                if (isRoot && text && this.editor.allowed('p', parentName)) {
                    parent.replaceChild(this.editor.createElement('p', {}, text), node);
                } else if (isRoot) {
                    parent.removeChild(node);
                }
            } else {
                parent.removeChild(node);
            }
        });
    }
}
