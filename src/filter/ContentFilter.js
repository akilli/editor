import Filter from '../editor/Filter.js';

/**
 * Content filter
 */
export default class ContentFilter extends Filter {
    /**
     * @inheritDoc
     */
    filter(parent, forceRoot = false) {
        const isRoot = forceRoot || this.editor.content.isSameNode(parent);
        const parentName = forceRoot ? 'root' : this.editor.getTagName(parent);

        parent.normalize();
        Array.from(parent.childNodes).forEach(node => {
            if (node instanceof HTMLElement) {
                node = this.editor.convert(node);
            }

            if (node instanceof HTMLElement) {
                const name = node.tagName;
                const tag = this.editor.getTag(name);
                const text = node.textContent.trim();

                if (!tag) {
                    parent.removeChild(node);
                } else if (this.editor.allowed(name, parentName) || isRoot && tag.group === 'text') {
                    Array.from(node.attributes).forEach(item => {
                        if (!tag.attributes.includes(item.name)) {
                            node.removeAttribute(item.name);
                        }
                    });

                    if (node.hasChildNodes()) {
                        this.editor.filter(node);
                    }

                    if (!node.hasChildNodes() && !tag.empty && !(node instanceof HTMLTableCellElement)) {
                        parent.removeChild(node);
                    } else if (isRoot && tag.group === 'text') {
                        const p = this.editor.createElement('p');
                        p.innerHTML = node.outerHTML;
                        parent.replaceChild(p, node);
                    }
                } else if (isRoot && text) {
                    const p = this.editor.createElement('p');
                    p.textContent = text;
                    parent.replaceChild(p, node);
                } else if (text) {
                    parent.replaceChild(this.editor.createText(text), node);
                } else {
                    parent.removeChild(node);
                }
            } else if (node instanceof Text) {
                if (isRoot && node.textContent.trim()) {
                    const p = this.editor.createElement('p');
                    p.textContent = node.textContent.trim();
                    parent.replaceChild(p, node);
                } else if (isRoot) {
                    parent.removeChild(node);
                }
            } else {
                parent.removeChild(node);
            }
        });
    }
}
