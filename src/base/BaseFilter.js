import Filter from './Filter.js';

/**
 * Base filter
 */
export default class BaseFilter extends Filter {
    /**
     * @inheritDoc
     */
    filter(element) {
        const name = element.tagName.toLowerCase();
        const isRoot = this.editor.isContent(element);

        Array.from(element.childNodes).forEach(child => {
            if (child instanceof HTMLElement) {
                child = this.editor.convert(child);
            }

            if (child instanceof HTMLElement) {
                const childName = child.tagName.toLowerCase();
                const tag = this.editor.tags.get(childName);
                const text = child.textContent.trim();

                if (tag && (this.editor.allowed(childName, name) || isRoot && tag.group === 'format' && this.editor.allowed('p', name))) {
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
                    } else if (!this.editor.allowed(childName, name)) {
                        element.replaceChild(this.editor.createElement('p', {content: child.outerHTML, html: true}), child);
                    }
                } else if (isRoot && text && this.editor.allowed('p', name)) {
                    element.replaceChild(this.editor.createElement('p', {content: text}), child);
                } else if (text && this.editor.allowed('text', name)) {
                    element.replaceChild(this.editor.createText(text), child);
                } else {
                    element.removeChild(child);
                }
            } else if (child instanceof Text) {
                const text = child.textContent.trim();

                if (isRoot && text && this.editor.allowed('p', name)) {
                    element.replaceChild(this.editor.createElement('p', {content: text}), child);
                } else if (!text || !this.editor.allowed('text', name)) {
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
