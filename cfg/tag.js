/**
 * Tag configuration
 *
 * @typedef {Object} ConfigTag
 *
 * @property {string[]} attributes Allowed attributes
 * @property {string[]} children   Allowed groups of child elements
 * @property {boolean}  editable   Is element editable
 * @property {boolean}  empty      Is empty element
 * @property {string}   group      Name of the tag group
 */
'use strict';

const data = [
    [
        '_root_',
        {
            attributes: [],
            children: ['details', 'figure', 'heading', 'list', 'paragraph'],
            editable: false,
            empty: false,
            group: 'root',
        }
    ],
    [
        'a',
        {
            attributes: ['href'],
            children: [],
            editable: false,
            empty: false,
            group: 'text',
        }
    ],
    [
        'audio',
        {
            attributes: ['controls', 'height', 'src', 'width'],
            children: [],
            editable: false,
            empty: false,
            group: 'media',
        }
    ],
    [
        'blockquote',
        {
            attributes: [],
            children: ['paragraph'],
            editable: false,
            empty: false,
            group: 'blockquote',
        }
    ],
    [
        'br',
        {
            attributes: [],
            children: [],
            editable: false,
            empty: true,
            group: 'break',
        }
    ],
    [
        'cite',
        {
            attributes: [],
            children: [],
            editable: false,
            empty: false,
            group: 'text',
        }
    ],
    [
        'details',
        {
            attributes: [],
            children: ['figure', 'paragraph', 'summary'],
            editable: false,
            empty: false,
            group: 'details',
        }
    ],
    [
        'dfn',
        {
            attributes: [],
            children: [],
            editable: false,
            empty: false,
            group: 'text',
        }
    ],
    [
        'figcaption',
        {
            attributes: [],
            children: ['text'],
            editable: true,
            empty: false,
            group: 'caption',
        }
    ],
    [
        'figure',
        {
            attributes: ['class'],
            children: ['blockquote', 'caption', 'media', 'table'],
            editable: false,
            empty: false,
            group: 'figure',
        }
    ],
    [
        'h2',
        {
            attributes: [],
            children: [],
            editable: true,
            empty: false,
            group: 'heading',
        }
    ],
    [
        'h3',
        {
            attributes: [],
            children: [],
            editable: true,
            empty: false,
            group: 'heading',
        }
    ],
    [
        'i',
        {
            attributes: [],
            children: [],
            editable: false,
            empty: false,
            group: 'text',
        }
    ],
    [
        'iframe',
        {
            attributes: ['allowfullscreen', 'height', 'src', 'width'],
            children: [],
            editable: false,
            empty: false,
            group: 'media',
        }
    ],
    [
        'img',
        {
            attributes: ['alt', 'height', 'src', 'width'],
            children: [],
            editable: false,
            empty: true,
            group: 'media',
        }
    ],
    [
        'li',
        {
            attributes: [],
            children: ['break', 'text'],
            editable: true,
            empty: false,
            group: 'listitem',
        }
    ],
    [
        'kbd',
        {
            attributes: [],
            children: [],
            editable: false,
            empty: false,
            group: 'text',
        }
    ],
    [
        'mark',
        {
            attributes: [],
            children: [],
            editable: false,
            empty: false,
            group: 'text',
        }
    ],
    [
        'ol',
        {
            attributes: [],
            children: ['listitem'],
            editable: false,
            empty: false,
            group: 'list',
        }
    ],
    [
        'p',
        {
            attributes: [],
            children: ['break', 'text'],
            editable: true,
            empty: false,
            group: 'paragraph',
        }
    ],
    [
        'q',
        {
            attributes: [],
            children: [],
            editable: false,
            empty: false,
            group: 'text',
        }
    ],
    [
        'strong',
        {
            attributes: [],
            children: [],
            editable: false,
            empty: false,
            group: 'text',
        }
    ],
    [
        'summary',
        {
            attributes: [],
            children: [],
            editable: true,
            empty: false,
            group: 'summary',
        }
    ],
    [
        'table',
        {
            attributes: [],
            children: ['tablepart'],
            editable: false,
            empty: false,
            group: 'table',
        }
    ],
    [
        'tbody',
        {
            attributes: [],
            children: ['tablerow'],
            editable: false,
            empty: false,
            group: 'tablepart',
        }
    ],
    [
        'td',
        {
            attributes: [],
            children: ['break', 'text'],
            editable: true,
            empty: false,
            group: 'tablecell',
        }
    ],
    [
        'tfoot',
        {
            attributes: [],
            children: ['tablerow'],
            editable: false,
            empty: false,
            group: 'tablepart',
        }
    ],
    [
        'th',
        {
            attributes: [],
            children: ['break', 'text'],
            editable: true,
            empty: false,
            group: 'tablecell',
        }
    ],
    [
        'thead', {
            attributes: [],
            children: ['tablerow'],
            editable: false,
            empty: false,
            group: 'tablepart',
        }
    ],
    [
        'tr',
        {
            attributes: [],
            children: ['tablecell'],
            editable: false,
            empty: false,
            group: 'tablerow',
        }
    ],
    [
        'ul',
        {
            attributes: [],
            children: ['listitem'],
            editable: false,
            empty: false,
            group: 'list',
        }
    ],
    [
        'video',
        {
            attributes: ['controls', 'height', 'src', 'width'],
            children: [],
            editable: false,
            empty: false,
            group: 'media',
        }
    ],
];

export default data;
