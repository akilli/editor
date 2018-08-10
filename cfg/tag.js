/**
 * Tag configuration
 *
 * @type {Object[]}
 */
const data = [
    {name: 'root', children: ['details', 'figure', 'heading', 'list', 'p', 'section']},
    {name: 'a', group: 'text', attributes: ['href']},
    {name: 'audio', group: 'media', attributes: ['controls', 'height', 'src', 'width'], empty: true},
    {name: 'blockquote', children: ['p']},
    {name: 'br', empty: true},
    {name: 'cite', group: 'text'},
    {name: 'details', children: ['figure', 'list', 'p', 'summary']},
    {name: 'dfn', group: 'text'},
    {name: 'figcaption', children: ['text'], editable: true, enter: 'p'},
    {name: 'figure', attributes: ['class'], children: ['blockquote', 'figcaption', 'media', 'table']},
    {name: 'h2', group: 'heading', editable: true, enter: 'p'},
    {name: 'h3', group: 'heading', editable: true, enter: 'p'},
    {name: 'i', group: 'text'},
    {name: 'iframe', group: 'media', attributes: ['allowfullscreen', 'height', 'src', 'width'], empty: true},
    {name: 'img', group: 'media', attributes: ['alt', 'height', 'src', 'width'], empty: true},
    {name: 'li', children: ['br', 'text'], editable: true, enter: 'li'},
    {name: 'kbd', group: 'text'},
    {name: 'mark', group: 'text'},
    {name: 'ol', group: 'list', children: ['li']},
    {name: 'p', children: ['br', 'text'], editable: true, enter: 'p'},
    {name: 'q', group: 'text'},
    {name: 'section', attributes: ['class'], children: ['details', 'figure', 'list', 'heading', 'p']},
    {name: 'strong', group: 'text'},
    {name: 'summary', editable: true, enter: 'p'},
    {name: 'table', children: ['tablepart']},
    {name: 'tbody', group: 'tablepart', children: ['tr']},
    {name: 'td', group: 'tablecell', children: ['br', 'text'], editable: true},
    {name: 'tfoot', group: 'tablepart', children: ['tr']},
    {name: 'th', group: 'tablecell', children: ['br', 'text'], editable: true},
    {name: 'thead', group: 'tablepart', children: ['tr']},
    {name: 'tr', children: ['tablecell']},
    {name: 'ul', group: 'list', children: ['li']},
    {name: 'video', group: 'media', attributes: ['controls', 'height', 'src', 'width'], empty: true}
];

export default data;
