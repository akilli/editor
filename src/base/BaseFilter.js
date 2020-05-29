import Filter from './Filter.js';

/**
 * Base filter
 */
export default class BaseFilter extends Filter {
    /**
     * Initializes a new base filter
     *
     * @param {Editor} editor
     */
    constructor(editor) {
        super(editor, 'base');
    }

    /**
     * @inheritDoc
     */
    filter(element) {
        const name = element.tagName.toLowerCase();
        const isRoot = this.editor.isContent(element);

        Array.from(element.childNodes).forEach(child => {
            if (child instanceof HTMLElement) {
                child = this.convert(child);
                const childName = child.tagName.toLowerCase();
                const tag = this.editor.tags.get(childName);
                const text = child.textContent.trim();

                if (tag && (this.editor.tags.isAllowed(childName, name) || isRoot && tag.group === 'format' && this.editor.tags.isAllowed('p', name))) {
                    Array.from(child.attributes).forEach(item => {
                        if (!tag.attributes.includes(item.name)) {
                            child.removeAttribute(item.name);
                        }
                    });

                    if (child.hasChildNodes()) {
                        this.editor.filters.filter(child);
                    }

                    if (!child.hasChildNodes() && !tag.empty) {
                        element.removeChild(child);
                    } else if (!this.editor.tags.isAllowed(childName, name)) {
                        element.replaceChild(this.editor.createElement('p', {html: child.outerHTML}), child);
                    }
                } else if (isRoot && text && this.editor.tags.isAllowed('p', name)) {
                    element.replaceChild(this.editor.createElement('p', {html: text}), child);
                } else if (text && this.editor.tags.isAllowed('text', name)) {
                    element.replaceChild(this.editor.createText(text), child);
                } else {
                    element.removeChild(child);
                }
            } else if (child instanceof Text) {
                const text = child.textContent.trim();

                if (isRoot && text && this.editor.tags.isAllowed('p', name)) {
                    element.replaceChild(this.editor.createElement('p', {html: text}), child);
                } else if (!text || !this.editor.tags.isAllowed('text', name)) {
                    element.removeChild(child);
                }
            } else {
                element.removeChild(child);
            }
        });

        // Filter linebreaks
        element.innerHTML = element.innerHTML.replace(/^\s*(<br\s*\/?>\s*)+/gi, '').replace(/\s*(<br\s*\/?>\s*)+$/gi, '');

        if (element instanceof HTMLParagraphElement) {
            element.outerHTML = element.outerHTML.replace(/\s*(<br\s*\/?>\s*){2,}/gi, '</p><p>');
        } else{
            element.innerHTML = element.innerHTML.replace(/\s*(<br\s*\/?>\s*){2,}/gi, '<br>');
        }
    }

    /**
     * Converts element
     *
     * @private
     * @param {HTMLElement} element
     * @return {HTMLElement}
     */
    convert(element) {
        const target = this.config.base.filter[element.tagName.toLowerCase()];

        if (!target) {
            return element;
        }

        const newNode = this.editor.createElement(target, {html: element.innerHTML})
        element.parentElement.replaceChild(newNode, element);

        return newNode;
    }
}
