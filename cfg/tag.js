/**
 * Tag configuration
 *
 * @type {Object[]}
 */
export default [
    // Root
    {name: 'root', children: ['details', 'figure', 'heading', 'list', 'p']},
    // Paragraph
    {name: 'p', children: ['br', 'text'], editable: true, enter: 'p'},
    // Heading
    {name: 'h2', group: 'heading', editable: true, enter: 'p'},
    {name: 'h3', group: 'heading', editable: true, enter: 'p'},
    // List
    {name: 'ul', group: 'list', children: ['li']},
    {name: 'ol', group: 'list', children: ['li']},
    {name: 'li', children: ['br', 'text'], editable: true, enter: 'li'},
    // Figure
    {name: 'figure', attributes: ['class'], children: ['blockquote', 'figcaption', 'media', 'table']},
    {name: 'figcaption', children: ['text'], editable: true, enter: 'p'},
    // Blockquote
    {name: 'blockquote', children: ['p']},
    // Media
    {name: 'img', group: 'media', attributes: ['alt', 'height', 'src', 'width'], empty: true},
    {name: 'video', group: 'media', attributes: ['controls', 'height', 'src', 'width'], empty: true},
    {name: 'audio', group: 'media', attributes: ['controls', 'height', 'src', 'width'], empty: true},
    {name: 'iframe', group: 'media', attributes: ['allowfullscreen', 'height', 'src', 'width'], empty: true},
    // Table
    {name: 'table', children: ['tablesection']},
    {name: 'thead', group: 'tablesection', children: ['tr']},
    {name: 'tbody', group: 'tablesection', children: ['tr']},
    {name: 'tfoot', group: 'tablesection', children: ['tr']},
    {name: 'tr', children: ['tablecell']},
    {name: 'th', group: 'tablecell', children: ['br', 'text'], editable: true},
    {name: 'td', group: 'tablecell', children: ['br', 'text'], editable: true},
    // Details
    {name: 'details', children: ['figure', 'list', 'p', 'summary']},
    {name: 'summary', editable: true, enter: 'p'},
    // Text
    {name: 'strong', group: 'text'},
    {name: 'i', group: 'text'},
    {name: 'dfn', group: 'text'},
    {name: 'kbd', group: 'text'},
    {name: 'mark', group: 'text'},
    {name: 'q', group: 'text'},
    {name: 'cite', group: 'text'},
    {name: 'a', group: 'text', attributes: ['href']},
    // Break
    {name: 'br', empty: true},
]
