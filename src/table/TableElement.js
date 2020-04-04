import Element from '../editor/Element.js';

/**
 * Table Element
 */
export default class TableElement extends Element {
    /**
     * Creates table element
     *
     * @param {Number} rows
     * @param {Number} cols
     * @param {String} [caption = '']
     *
     * @return {HTMLElement}
     */
    create({rows = 1, cols = 1, caption = ''} = {}) {
        if (rows <= 0 || cols <= 0) {
            throw 'Invalid argument';
        }

        const figure = this.editor.createElement('figure', {class: 'table'});
        const table = this.editor.createElement('table');
        const figcaption = this.editor.createElement('figcaption');

        figure.appendChild(table);
        figcaption.innerHTML = caption;
        figure.appendChild(figcaption);

        ['thead', 'tbody', 'tfoot'].forEach(section => {
            const item = this.editor.createElement(section);
            const cell = section === 'thead' ? 'th' : 'td';
            const r = section === 'tbody' ? rows : 1;
            let tr;

            table.appendChild(item);

            for (let i = 0; i < r; i++) {
                tr = this.editor.createElement('tr');
                item.appendChild(tr);

                for (let j = 0; j < cols; ++j) {
                    tr.appendChild(this.editor.createElement(cell));
                }
            }
        });

        return figure;
    }
}
