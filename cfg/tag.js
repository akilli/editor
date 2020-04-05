import Tag from '../src/editor/Tag.js';

/**
 * Tag configuration
 *
 * @type {Function[]}
 */
export default [
    // Root
    editor => new Tag(editor, 'root', 'root', {children: ['details', 'figure', 'heading', 'list', 'p']}),
    // Paragraph
    editor => new Tag(editor, 'p', 'p', {children: ['br', 'text'], editable: true, enter: 'p'}),
    // Heading
    editor => new Tag(editor, 'h2', 'heading', {editable: true, enter: 'p'}),
    editor => new Tag(editor, 'h3', 'heading', {editable: true, enter: 'p'}),
    // List
    editor => new Tag(editor, 'ul', 'list', {children: ['li']}),
    editor => new Tag(editor, 'ol', 'list', {children: ['li']}),
    editor => new Tag(editor, 'li', 'li', {children: ['br', 'text'], editable: true, enter: 'li'}),
    // Figure
    editor => new Tag(editor, 'figure', 'figure', {attributes: ['class'], children: ['blockquote', 'figcaption', 'media', 'table']}),
    editor => new Tag(editor, 'figcaption', 'figcaption', {children: ['text'], editable: true, enter: 'p'}),
    // Blockquote
    editor => new Tag(editor, 'blockquote', 'blockquote', {children: ['p']}),
    // Media
    editor => new Tag(editor, 'img', 'media', {attributes: ['alt', 'height', 'src', 'width'], empty: true}),
    editor => new Tag(editor, 'video', 'media', {attributes: ['controls', 'height', 'src', 'width'], empty: true}),
    editor => new Tag(editor, 'audio', 'media', {attributes: ['controls', 'height', 'src', 'width'], empty: true}),
    editor => new Tag(editor, 'iframe', 'media', {attributes: ['allowfullscreen', 'height', 'src', 'width'], empty: true}),
    // Table
    editor => new Tag(editor, 'table', 'table', {children: ['tablesection']}),
    editor => new Tag(editor, 'thead', 'tablesection', {children: ['tr']}),
    editor => new Tag(editor, 'tbody', 'tablesection', {children: ['tr']}),
    editor => new Tag(editor, 'tfoot', 'tablesection', {children: ['tr']}),
    editor => new Tag(editor, 'tr', 'tr', {children: ['tablecell']}),
    editor => new Tag(editor, 'th', 'tablecell', {children: ['br', 'text'], editable: true}),
    editor => new Tag(editor, 'td', 'tablecell', {children: ['br', 'text'], editable: true}),
    // Details
    editor => new Tag(editor, 'details', 'details', {children: ['figure', 'list', 'p', 'summary']}),
    editor => new Tag(editor, 'summary', 'summary', {editable: true, enter: 'p'}),
    // Text
    editor => new Tag(editor, 'strong', 'text'),
    editor => new Tag(editor, 'i', 'text'),
    editor => new Tag(editor, 'dfn', 'text'),
    editor => new Tag(editor, 'kbd', 'text'),
    editor => new Tag(editor, 'mark', 'text'),
    editor => new Tag(editor, 'q', 'text'),
    editor => new Tag(editor, 'cite', 'text'),
    editor => new Tag(editor, 'a', 'text', {attributes: ['href']}),
    // Break
    editor => new Tag(editor, 'br', 'br', {empty: true}),
]
