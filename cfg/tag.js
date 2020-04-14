/**
 * Tag configuration
 *
 * @type {Object[]}
 */
export default [
    // Root
    {name: 'root', group: 'root', children: ['details', 'figure', 'heading', 'list', 'paragraph']},
    // Paragraph
    {name: 'p', group: 'paragraph', children: ['break', 'text'], editable: true, enter: 'p'},
    // Heading
    {name: 'h2', group: 'heading', editable: true, enter: 'p'},
    {name: 'h3', group: 'heading', editable: true, enter: 'p'},
    // List
    {name: 'ul', group: 'list', children: ['listitem']},
    {name: 'ol', group: 'list', children: ['listitem']},
    {name: 'li', group: 'listitem', children: ['break', 'text'], editable: true, enter: 'li'},
    // Figure
    {name: 'figure', group: 'figure', attributes: ['class'], children: ['blockquote', 'caption', 'media', 'table']},
    {name: 'figcaption', group: 'caption', children: ['text'], editable: true, enter: 'p'},
    // Blockquote
    {name: 'blockquote', group: 'blockquote', children: ['paragraph']},
    // Media
    {name: 'img', group: 'media', attributes: ['alt', 'height', 'src', 'width'], empty: true},
    {name: 'video', group: 'media', attributes: ['controls', 'height', 'src', 'width'], empty: true},
    {name: 'audio', group: 'media', attributes: ['controls', 'height', 'src', 'width'], empty: true},
    {name: 'iframe', group: 'media', attributes: ['allowfullscreen', 'height', 'src', 'width'], empty: true},
    // Table
    {name: 'table', group: 'table', children: ['tablesection']},
    {name: 'thead', group: 'tablesection', children: ['tablerow']},
    {name: 'tbody', group: 'tablesection', children: ['tablerow']},
    {name: 'tfoot', group: 'tablesection', children: ['tablerow']},
    {name: 'tr', group: 'tablerow', children: ['tablecell']},
    {name: 'th', group: 'tablecell', children: ['break', 'text'], editable: true, empty: true},
    {name: 'td', group: 'tablecell', children: ['break', 'text'], editable: true, empty: true},
    // Details
    {name: 'details', group: 'details', children: ['figure', 'list', 'paragraph', 'summary']},
    {name: 'summary', group: 'summary', editable: true, enter: 'p'},
    // Text
    {name: 'strong', group: 'text'},
    {name: 'i', group: 'text'},
    {name: 'a', group: 'text', attributes: ['href']},
    // Break
    {name: 'br', group: 'break', empty: true},
]
