import Tag from '../src/editor/Tag.js';

/**
 * Tag configuration
 *
 * @type {Object.<String, Function>}
 */
export default {
    // Root
    root: () => new Tag({name: 'root', group: 'root', children: ['details', 'figure', 'heading', 'list', 'p']}),
    // Paragraph
    p: () => new Tag({name: 'p', group: 'p', children: ['br', 'text'], editable: true, enter: 'p'}),
    // Heading
    h2: () => new Tag({name: 'h2', group: 'heading', editable: true, enter: 'p'}),
    h3: () => new Tag({name: 'h3', group: 'heading', editable: true, enter: 'p'}),
    // List
    ul: () => new Tag({name: 'ul', group: 'list', children: ['li']}),
    ol: () => new Tag({name: 'ol', group: 'list', children: ['li']}),
    li: () => new Tag({name: 'li', group: 'li', children: ['br', 'text'], editable: true, enter: 'li'}),
    // Figure
    figure: () => new Tag({name: 'figure', group: 'figure', attributes: ['class'], children: ['blockquote', 'figcaption', 'media', 'table']}),
    figcaption: () => new Tag({name: 'figcaption', group: 'figcaption', children: ['text'], editable: true, enter: 'p'}),
    // Blockquote
    blockquote: () => new Tag({name: 'blockquote', group: 'blockquote', children: ['p']}),
    // Media
    img: () => new Tag({name: 'img', group: 'media', attributes: ['alt', 'height', 'src', 'width'], empty: true}),
    video: () => new Tag({name: 'video', group: 'media', attributes: ['controls', 'height', 'src', 'width'], empty: true}),
    audio: () => new Tag({name: 'audio', group: 'media', attributes: ['controls', 'height', 'src', 'width'], empty: true}),
    iframe: () => new Tag({name: 'iframe', group: 'media', attributes: ['allowfullscreen', 'height', 'src', 'width'], empty: true}),
    // Table
    table: () => new Tag({name: 'table', group: 'table', children: ['tablesection']}),
    thead: () => new Tag({name: 'thead', group: 'tablesection', children: ['tr']}),
    tbody: () => new Tag({name: 'tbody', group: 'tablesection', children: ['tr']}),
    tfoot: () => new Tag({name: 'tfoot', group: 'tablesection', children: ['tr']}),
    tr: () => new Tag({name: 'tr', group: 'tr', children: ['tablecell']}),
    th: () => new Tag({name: 'th', group: 'tablecell', children: ['br', 'text'], editable: true}),
    td: () => new Tag({name: 'td', group: 'tablecell', children: ['br', 'text'], editable: true}),
    // Details
    details: () => new Tag({name: 'details', group: 'details', children: ['figure', 'list', 'p', 'summary']}),
    summary: () => new Tag({name: 'summary', group: 'summary', editable: true, enter: 'p'}),
    // Text
    strong: () => new Tag({name: 'strong', group: 'text'}),
    i: () => new Tag({name: 'i', group: 'text'}),
    dfn: () => new Tag({name: 'dfn', group: 'text'}),
    kbd: () => new Tag({name: 'kbd', group: 'text'}),
    mark: () => new Tag({name: 'mark', group: 'text'}),
    q: () => new Tag({name: 'q', group: 'text'}),
    cite: () => new Tag({name: 'cite', group: 'text'}),
    a: () => new Tag({name: 'a', group: 'text', attributes: ['href']}),
    // Break
    br: () => new Tag({name: 'br', group: 'br', empty: true}),
}
