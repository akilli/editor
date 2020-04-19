import Filter from './Filter.js';

/**
 * Base filter
 */
export default class BaseFilter extends Filter {
    /**
     * @inheritDoc
     */
    filter(element) {
        const elementName = this.editor.getTagName(element);
        const isRoot = this.editor.isRoot(element);

        Array.from(element.childNodes).forEach(child => {
            if (child instanceof HTMLElement) {
                child = this.editor.convert(child);
            }

            if (child instanceof HTMLElement) {
                const name = child.tagName.toLowerCase();
                const tag = this.editor.tags.get(name);
                const text = child.textContent.trim();

                if (tag && (this.editor.allowed(name, elementName) || isRoot && tag.group === 'text' && this.editor.allowed('p', elementName))) {
                    Array.from(child.attributes).forEach(item => {
                        if (!tag.attributes.includes(item.name)) {
                            child.removeAttribute(item.name);
                        }
                    });

                    if (child.hasChildNodes()) {
                        this.editor.filter(child);
                    }

                    if (!child.hasChildNodes() && !tag.empty) {
                        element.removeChild(child);
                    } else if (!this.editor.allowed(name, elementName)) {
                        element.replaceChild(this.editor.createElement('p', {content: child.outerHTML, html: true}), child);
                    }
                } else if (isRoot && text && this.editor.allowed('p', elementName)) {
                    element.replaceChild(this.editor.createElement('p', {content: text}), child);
                } else if (text && this.editor.allowed('text', elementName)) {
                    element.replaceChild(this.editor.createText(text), child);
                } else {
                    element.removeChild(child);
                }
            } else if (child instanceof Text) {
                const text = child.textContent.trim();

                if (isRoot && text && this.editor.allowed('p', elementName)) {
                    element.replaceChild(this.editor.createElement('p', {content: text}), child);
                } else if (!text || !this.editor.allowed('text', elementName)) {
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
}
