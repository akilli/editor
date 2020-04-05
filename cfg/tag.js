import Tag from '../src/editor/Tag.js';

/**
 * Tag configuration
 *
 * @type {Function[]}
 */
export default [
    // Root
    editor => new Tag(editor, 'root', {group: 'root', children: ['details', 'figure', 'heading', 'list', 'p']}),
    // Paragraph
    editor => new Tag(editor, 'p', {group: 'p', children: ['br', 'text'], editable: true, enter: 'p'}),
    // Heading
    editor => new Tag(editor, 'h2', {group: 'heading', editable: true, enter: 'p'}),
    editor => new Tag(editor, 'h3', {group: 'heading', editable: true, enter: 'p'}),
    // List
    editor => new Tag(editor, 'ul', {group: 'list', children: ['li']}),
    editor => new Tag(editor, 'ol', {group: 'list', children: ['li']}),
    editor => new Tag(editor, 'li', {group: 'li', children: ['br', 'text'], editable: true, enter: 'li'}),
    // Figure
    editor => new Tag(editor, 'figure', {group: 'figure', attributes: ['class'], children: ['blockquote', 'figcaption', 'media', 'table']}),
    editor => new Tag(editor, 'figcaption', {group: 'figcaption', children: ['text'], editable: true, enter: 'p'}),
    // Blockquote
    editor => new Tag(editor, 'blockquote', {group: 'blockquote', children: ['p']}),
    // Media
    editor => new Tag(editor, 'img', {group: 'media', attributes: ['alt', 'height', 'src', 'width'], empty: true}),
    editor => new Tag(editor, 'video', {group: 'media', attributes: ['controls', 'height', 'src', 'width'], empty: true}),
    editor => new Tag(editor, 'audio', {group: 'media', attributes: ['controls', 'height', 'src', 'width'], empty: true}),
    editor => new Tag(editor, 'iframe', {group: 'media', attributes: ['allowfullscreen', 'height', 'src', 'width'], empty: true}),
    // Table
    editor => new Tag(editor, 'table', {group: 'table', children: ['tablesection']}),
    editor => new Tag(editor, 'thead', {group: 'tablesection', children: ['tr']}),
    editor => new Tag(editor, 'tbody', {group: 'tablesection', children: ['tr']}),
    editor => new Tag(editor, 'tfoot', {group: 'tablesection', children: ['tr']}),
    editor => new Tag(editor, 'tr', {group: 'tr', children: ['tablecell']}),
    editor => new Tag(editor, 'th', {group: 'tablecell', children: ['br', 'text'], editable: true}),
    editor => new Tag(editor, 'td', {group: 'tablecell', children: ['br', 'text'], editable: true}),
    // Details
    editor => new Tag(editor, 'details', {group: 'details', children: ['figure', 'list', 'p', 'summary']}),
    editor => new Tag(editor, 'summary', {group: 'summary', editable: true, enter: 'p'}),
    // Text
    editor => new Tag(editor, 'strong', {group: 'text'}),
    editor => new Tag(editor, 'i', {name: 'i', group: 'text'}),
    editor => new Tag(editor, 'dfn', {name: 'dfn', group: 'text'}),
    editor => new Tag(editor, 'kbd', {name: 'kbd', group: 'text'}),
    editor => new Tag(editor, 'mark', {name: 'mark', group: 'text'}),
    editor => new Tag(editor, 'q', {name: 'q', group: 'text'}),
    editor => new Tag(editor, 'cite', {name: 'cite', group: 'text'}),
    editor => new Tag(editor, 'a', {name: 'a', group: 'text', attributes: ['href']}),
    // Break
    editor => new Tag(editor, 'br', {group: 'br', empty: true}),
]
